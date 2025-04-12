
    /* 
      Define your shortcuts in a markdown-like format:
      - Headings (using #) serve as categories.
      - List items (starting with -) define shortcuts.
      - Use markdown link syntax to set a custom name and URL.
      
      For example:
      # Work
      ## [Meetings](https://example.com/meetings)
      - [Weekly sync](https://example.com/weekly-sync)
      - [Project kickoff](https://example.com/kickoff)
      
      # Personal
      ## [Groceries](https://example.com/groceries)
      - [Milk](https://example.com/milk)
      - [Eggs](https://example.com/eggs)
    */
    const markdownData = `
# Work
## [Meetings](https://example.com/meetings)
- [Weekly sync](https://example.com/weekly-sync)
- [Project kickoff](https://example.com/kickoff)

# Personal
## [Groceries](https://example.com/groceries)
- [Milk](https://example.com/milk)
- [Eggs](https://example.com/eggs)

## [Reading List](https://example.com/reading)
- [Atomic Habits](https://example.com/atomic-habits)
- [Deep Work](https://example.com/deep-work)
`;

    // Parse the markdown data into a hierarchical tree.
    // This version distinguishes between headings (lines starting with '#')
    // and list items (lines starting with '-') and assigns a level accordingly.
    function parseMarkdownHierarchy(md) {
      const lines = md.split("\n").filter(line => line.trim() !== "");
      const tree = [];
      const stack = [{ level: 0, children: tree }];

      lines.forEach(line => {
        let trimmed = line.trim();
        let node;
        // Check for heading lines
        let headingMatch = trimmed.match(/^(#+)\s+(.*)/);
        if (headingMatch) {
          let level = headingMatch[1].length; // heading level
          let text = headingMatch[2];
          // See if this heading includes a markdown link [name](url)
          const linkMatch = text.match(/^\[([^\]]+)\]\(([^)]+)\)/);
          let title, url;
          if(linkMatch){
            title = linkMatch[1];
            url = linkMatch[2];
          } else {
            title = text;
            url = "";
          }
          node = { title, url, level, children: [] };
          while(stack[stack.length - 1].level >= level) {
            stack.pop();
          }
          stack[stack.length - 1].children.push(node);
          stack.push({ level, children: node.children });
        } else {
          // Check for list items (starting with "-")
          let listMatch = trimmed.match(/^\-\s+(.*)/);
          if(listMatch) {
            let text = listMatch[1];
            // See if the list item includes a markdown link [name](url)
            const linkMatch = text.match(/^\[([^\]]+)\]\(([^)]+)\)/);
            let title, url;
            if(linkMatch) {
              title = linkMatch[1];
              url = linkMatch[2];
            } else {
              title = text;
              url = "";
            }
            // For list items, use parent's level + 1.
            let level = stack[stack.length - 1].level + 1;
            node = { title, url, level, children: [] };
            stack[stack.length - 1].children.push(node);
            stack.push({ level, children: node.children });
          } else {
            // Fallback: treat as a plain text item.
            let level = stack[stack.length - 1].level + 1;
            node = { title: trimmed, url: "", level, children: [] };
            stack[stack.length - 1].children.push(node);
            stack.push({ level, children: node.children });
          }
        }
      });
      return tree;
    }

    // Render the tree. For each node, if a URL exists it renders a clickable link;
    // otherwise plain text. An "Edit" button lets you update the title and URL.
    function renderTree(tree, container) {
      tree.forEach(node => {
        const nodeEl = renderNode(node);
        container.appendChild(nodeEl);
      });
    }

    // Render an individual node with view and edit modes.
    function renderNode(node) {
      const container = document.createElement("div");
      container.style.marginLeft = (node.level * 20) + "px";
      
      // Function to render the node in view mode.
      function renderView() {
        container.innerHTML = "";
        let element;
        if (node.url) {
          element = document.createElement("a");
          element.href = node.url;
          element.target = "_blank";
          element.textContent = node.title;
        } else {
          element = document.createElement("span");
          element.textContent = node.title;
        }
        container.appendChild(element);
        // Add an "Edit" button.
        const btn = document.createElement("button");
        btn.textContent = "Edit";
        btn.style.marginLeft = "10px";
        btn.addEventListener("click", renderEdit);
        container.appendChild(btn);
        // Render any child nodes.
        if (node.children.length) {
          node.children.forEach(child => {
            container.appendChild(renderNode(child));
          });
        }
      }

      // Function to switch the node to edit mode.
      function renderEdit() {
        container.innerHTML = "";
        // Create an input for the title.
        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.value = node.title;
        container.appendChild(titleInput);
        // Create an input for the URL.
        const urlInput = document.createElement("input");
        urlInput.type = "text";
        urlInput.value = node.url;
        urlInput.placeholder = "URL";
        urlInput.style.marginLeft = "10px";
        container.appendChild(urlInput);
        // Create a "Save" button.
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.style.marginLeft = "10px";
        saveBtn.addEventListener("click", () => {
          node.title = titleInput.value;
          node.url = urlInput.value;
          renderView();
        });
        container.appendChild(saveBtn);
      }
      
      // Start by rendering the node in view mode.
      renderView();
      return container;
    }

    const treeData = parseMarkdownHierarchy(markdownData);
    renderTree(treeData, document.getElementById("markdown-tree"));


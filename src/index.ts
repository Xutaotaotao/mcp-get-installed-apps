import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getInstalledApps } from "get-installed-apps";

// Create server instance
const server = new McpServer({
  name: "mcp-get-installed-apps",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  "get-installed-apps",
  "Get my computer's installed apps",
  async () => {
    const apps = await getInstalledApps();
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(apps, null, 2),
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Get Installed Apps MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});

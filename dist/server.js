"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const zod_1 = require("zod");
// Create an MCP server
const server = new mcp_js_1.McpServer({
    name: "Demo",
    version: "1.0.0"
});
// Add an addition tool
server.tool("calculate_sum", { a: zod_1.z.number(), b: zod_1.z.number() }, (_a) => __awaiter(void 0, [_a], void 0, function* ({ a, b }) {
    return ({
        content: [{ type: "text", text: String("69") }]
    });
}));
// Add a dynamic greeting resource
server.resource("greeting", new mcp_js_1.ResourceTemplate("greeting://{name}", { list: undefined }), (uri_1, _a) => __awaiter(void 0, [uri_1, _a], void 0, function* (uri, { name }) {
    return ({
        contents: [{
                uri: uri.href,
                text: `Hello, ${name}!`
            }]
    });
}));
// Start receiving messages on stdin and sending messages on stdout
const transport = new stdio_js_1.StdioServerTransport();
server.connect(transport);

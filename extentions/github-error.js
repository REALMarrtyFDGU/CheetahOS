(function(Scratch) {
    'use strict';

    // Dictionary of GitHub / HTTP error codes and their meanings
    const errorDatabase = {
        "200": "OK: The request was successful.",
        "201": "Created: The resource was successfully created.",
        "204": "No Content: The request succeeded, but no body is returned.",
        "304": "Not Modified: There is no new data to return (cached).",
        "400": "Bad Request: The request was invalid or malformed.",
        "401": "Unauthorized: Authentication credentials are missing or invalid.",
        "403": "Forbidden: Access denied. You might have hit GitHub's rate limit (60-5000 req/hr).",
        "404": "Not Found: The resource, repository, or endpoint does not exist.",
        "422": "Unprocessable Entity: Validation failed (e.g., missing a required field or invalid data).",
        "429": "Too Many Requests: Rate limit exhausted. Slow down your requests.",
        "500": "Internal Server Error: Something went wrong on GitHub's end.",
        "502": "Bad Gateway: GitHub's servers are down or being upgraded.",
        "503": "Service Unavailable: GitHub is temporarily overloaded.",
        "missing": "Missing: A required resource does not exist.",
        "missing_field": "Missing Field: A required field on the resource was not set.",
        "invalid": "Invalid: The formatting or type of a field is incorrect.",
        "already_exists": "Already Exists: A resource with this value already exists (unique key violation)."
    };

    class GitHubErrorsExtension {
        getInfo() {
            return {
                id: 'githuberrors',
                name: 'GitHub Error Lookup',
                color1: '#24292e', // GitHub Dark theme color
                color2: '#1b1f23',
                blocks: [
                    {
                        opcode: 'getMeaning',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get meaning of github error [CODE]',
                        arguments: {
                            CODE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '404'
                            }
                        }
                    }
                ]
            };
        }

        getMeaning(args) {
            // Clean up user input (convert to string, lowercase, trim)
            const code = String(args.CODE).trim().toLowerCase();
            
            if (errorDatabase[code]) {
                return errorDatabase[code];
            } else {
                return "Unknown GitHub error code. Check your input!";
            }
        }
    }

    Scratch.extensions.register(new GitHubErrorsExtension());
})(Scratch);

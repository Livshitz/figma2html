# Module Import Fix Checklist

- [x] Check if FigmaToHtmlConverter.ts exists in the parent directory
- [x] Check if types.ts exists in the parent directory
- [x] Create stubs for missing files if needed
- [x] Run tests to confirm the error is resolved
- [x] Import error is resolved; implementation is a stub (tests fail as expected)

# CLI Feature Checklist

- [x] Add CLI entrypoint to FigmaToHtmlConverter.ts
- [x] Support reading JSON from stdin for paste (input path '-')
- [x] Best-practice CLI entrypoint in bin/figma2html.ts with shebang
- [x] Add bin entry to package.json
- [ ] Test CLI with stdin input 
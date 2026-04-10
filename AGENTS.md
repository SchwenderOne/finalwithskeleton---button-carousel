# AGENTS.md

## Project Scope

- Repository root for active work: `finalwithskeleton---final-frame-1one/`
- Stack: React 18 + Vite + TypeScript
- Styling: Tailwind utility classes embedded directly in TSX
- This codebase is an Anima-exported screen that is being refined manually rather than fully re-architected

## Start Here

- Install deps: `npm install`
- Run locally: `npm run dev`
- Build check: `npm run build`
- Main screen entry: `src/screens/FinalFrame/FinalFrame.tsx`

## Git Context

- Primary remote: `origin -> https://github.com/SchwenderOne/finalwithskeleton---final-frame-1one`
- Mirrored replacement remote: `button-carousel -> https://github.com/SchwenderOne/finalwithskeleton---button-carousel.git`
- Current work has already been pushed to both remotes during this session

## Current Layout Decisions

- The screen is still based on a fixed exported frame, but the frame width has been manually widened.
- `FRAME_WIDTH` in `src/screens/FinalFrame/FinalFrame.tsx` is intentionally wider than the original export to use more laptop width without non-uniform distortion.
- Do not reintroduce `scale(x, y)` non-uniform scaling. It visibly distorts controls and icons.
- The screen should use proportional scaling only: one uniform scale factor derived from viewport width/height.
- The dead-space/background outside the scaled frame must remain a flat solid `#000103`.
- The main screen background layer under the navbar must keep the same rounded top corners as the glass layer above it.
- The right preview canvas currently contains a zoomable/pannable content layer, an uploaded-character layer, rulers, and a dedicated dot-grid layer. Treat these as one coordinated viewport system when editing.

## Navbar Notes

- File: `src/screens/FinalFrame/sections/EditorStepNavigationSection/EditorStepNavigationSection.tsx`
- Top corners are rounded.
- Bottom corners are intentionally not rounded.
- The top-right button group has already been replaced from Figma and should not be reverted to the older oversized export.
- The left nav items were manually aligned against the right button cluster; preserve that alignment when editing.

## Sidebar Notes

- File: `src/screens/FinalFrame/sections/CharacterCreationSidebarSection/CharacterCreationSidebarSection.tsx`
- There was a redundant shadow/card layer behind the sidebar in `FinalFrame.tsx`; it has already been removed.
- The resize-sidebar handle has been manually refined and is still somewhat sensitive visually.
- The reference upload card in the create sidebar is temporarily functional:
  - click opens an image file picker
  - drag and drop also uploads an image
  - the uploaded file name replaces the placeholder text in the card
- The current upload flow is intentionally temporary and is wired directly to the preview canvas via `FinalFrame.tsx`.
- If touching the resize handle again:
  - compare against Figma node `61:1654`
  - verify both shape and arrow direction visually
  - avoid assuming the exported asset orientation is correct

## Canvas Notes

- Files:
  - `src/screens/FinalFrame/FinalFrame.tsx`
  - `src/screens/FinalFrame/sections/PreviewStageSection/CanvasDotGrid.tsx`
- Canvas wheel interaction is handled with native non-passive listeners on the preview viewport, not only React `onWheel`.
- Do not remove the `gesturestart` / `gesturechange` / `gestureend` prevention on the canvas container unless page-zoom behavior is being intentionally revisited.
- The dotted background is no longer a CSS `radial-gradient` background on the canvas container.
- The dot grid is now an SVG pattern layer in `CanvasDotGrid.tsx`.
  - it must always cover the full visible canvas area, even when zoomed out
  - zoom should be applied to the pattern, not by shrinking the whole SVG coverage area
  - panning/zooming roughness becomes visible quickly if the grid falls back to repaint-heavy CSS background math
- Uploaded characters are positioned in world-space coordinates and then projected into screen-space from `canvasViewport`.
  - keep uploaded content tied to `originX`, `originY`, and `zoom`
  - do not make the uploaded image screen-fixed unless explicitly requested
- Current canvas zoom behavior:
  - plain wheel/touchpad scroll pans the canvas
  - `Ctrl` / `Cmd` + scroll zooms the canvas
  - these interactions should affect only the canvas when the pointer is over it

## Figma Workflow

- For any Figma-driven visual fix, always fetch the node first with Figma MCP:
  - `get_design_context`
  - `get_screenshot`
- Do not guess from memory when matching buttons, nav controls, or glass effects.
- Prefer adapting the current codebase’s existing Tailwind/TSX patterns over pasting raw MCP output directly.

## Editing Rules For This Repo

- Use `apply_patch` for manual code edits.
- Prefer small targeted edits over broad rewrites. Large rewrites in this repo are risky because many elements are still absolute-positioned export fragments.
- Preserve current visual decisions unless the user explicitly asks to revisit them.
- If you need to widen the screen further, prefer adjusting the fixed frame width and the right preview area rather than stretching the whole frame.

## High-Risk Areas

- `src/screens/FinalFrame/FinalFrame.tsx`
  - contains the frame scaling logic, canvas viewport state, upload wiring, zoom/pan event handling, and right preview sizing
- `src/screens/FinalFrame/sections/EditorStepNavigationSection/EditorStepNavigationSection.tsx`
  - small spacing or radius changes are immediately visible
- `src/screens/FinalFrame/sections/CharacterCreationSidebarSection/CharacterCreationSidebarSection.tsx`
  - many absolute layers overlap; small changes can create duplicate-card or shadow artifacts
- `src/screens/FinalFrame/sections/PreviewStageSection/CanvasDotGrid.tsx`
  - easy to regress coverage when zoomed out
  - easy to reintroduce rough motion if the grid is converted back to a repaint-heavy background implementation

## Recommended Session Workflow

1. Run `git status`
2. Start dev server with `npm run dev`
3. Inspect the exact component/file before editing
4. If a Figma link is involved, fetch node context and screenshot first
5. Make a minimal patch
6. Run `npm run build`
7. Commit only after visual confirmation or a precise user-approved stop point




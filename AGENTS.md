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
- The paper/background texture below the navbar currently relies on:
  - a dedicated noise texture image layer
  - a paper tint overlay `rgba(231,228,228,0.2)`
  - no global blur over the paper layer (to keep noise visible)

## Collapsed Controls Notes

- File: `src/screens/FinalFrame/FinalFrame.tsx`
- Sidebar collapsed width is currently `76`.
- Collapsed resize-handle left offset is currently `-11`.
- Collapsed preview left is intentionally computed from handle geometry, not only `SIDEBAR_LEFT + width + gap`, so canvas spacing remains balanced in collapsed mode.
- The top mode switcher has a dedicated collapsed mode:
  - icon-only
  - vertical stack
  - `37x107` container
  - centerline aligned to the collapsed resize handle.

## Navbar Notes

- File: `src/screens/FinalFrame/sections/EditorStepNavigationSection/EditorStepNavigationSection.tsx`
- Top corners are rounded.
- Bottom corners are intentionally not rounded.
- The top-right button group has already been replaced from Figma and should not be reverted to the older oversized export.
- The left nav items were manually aligned against the right button cluster; preserve that alignment when editing.

## Sidebar Notes

- File: `src/screens/FinalFrame/sections/CharacterCreationSidebarSection/CharacterCreationSidebarSection.tsx`
- There was a redundant shadow/card layer behind the sidebar in `FinalFrame.tsx`; it has already been removed.
- Sidebar content is now mode-aware via `mode` prop from `FinalFrame.tsx`:
  - `create`/`variation`: existing create-state content
  - `edit`: Figma-matched edit-state content (header text/icon + middle controls)
- The resize-sidebar handle has been manually refined and now uses two render paths:
  - expanded state: existing exported handle asset
  - collapsed state: Figma-derived `17:4914` structure for immediate arrow visibility and glass behavior.
- Resize/collapse interaction is continuous:
  - dragging below threshold collapses during drag (no pointer-up required)
  - dragging while collapsed expands continuously
  - click toggle is still supported.
- Sidebar content now uses shared centering math on resize for main blocks (header, prompt, section rows, upload area, finish row, create button).
- The create button currently uses fixed width `154px` and centered positioning to match Figma proportions while sidebar width changes.
- Edit-state control row interaction is now functional:
  - left focus button toggles independently on/off
  - right person/shield selector is mutually exclusive
  - active-state liquid glass indicator uses Figma node `126:560` layering (`rgba(255,255,255,0.04)` + `plus-lighter` overlay)
  - person and shield hit areas/selection indicators are both `65x57` and icon-centered
- If touching the resize handle again:
  - compare against Figma node `61:1654`
  - verify both shape and arrow direction visually
  - avoid assuming the exported asset orientation is correct

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
  - contains frame scaling logic plus collapsed-mode spacing/alignment rules for preview and top mode switcher
- `src/screens/FinalFrame/sections/EditorStepNavigationSection/EditorStepNavigationSection.tsx`
  - small spacing or radius changes are immediately visible
- `src/screens/FinalFrame/sections/CharacterCreationSidebarSection/CharacterCreationSidebarSection.tsx`
  - many absolute layers overlap; small changes can create duplicate-card or shadow artifacts
  - contains drag state machine for expand/collapse thresholds
  - contains fixed-width Figma-style create button styling that is sensitive to subtle effect changes
  - contains edit-mode selection geometry (left focus toggle + person/shield selector) where 1-2px offsets are visibly wrong

## Recommended Session Workflow

1. Run `git status`
2. Start dev server with `npm run dev`
3. Inspect the exact component/file before editing
4. If a Figma link is involved, fetch node context and screenshot first
5. Make a minimal patch
6. Run `npm run build`
7. Commit only after visual confirmation or a precise user-approved stop point

# AGENTS.md

## Project Scope

- Repository root for active work: `finalwithskeleton---final-frame-1one/`
- Stack: React 18 + Vite + TypeScript
- Styling: Tailwind utility classes embedded directly in TSX
- Liquid glass rendering for key controls now uses `liquid-glass-react` (not only handcrafted blur/shadow layers)
- This codebase is an Anima-exported screen that is being refined manually rather than fully re-architected

## Start Here

- Install deps: `npm install`
- Run locally: `npm run dev`
- Build check: `npm run build`
- Main screen entry: `src/screens/FinalFrame/FinalFrame.tsx`

## Git Context

- Primary remote: `origin -> https://github.com/SchwenderOne/finalwithskeleton---final-frame-1one`
- Mirrored replacement remote: `button-carousel -> https://github.com/SchwenderOne/finalwithskeleton---button-carousel.git`
- Do not assume local changes are already pushed; verify with `git status` and `git log --oneline --decorate -n 5` before concluding push state.

## Current Layout Decisions

- The screen is still based on a fixed exported frame, but the frame width has been manually widened.
- `FRAME_WIDTH` in `src/screens/FinalFrame/FinalFrame.tsx` is intentionally wider than the original export to use more laptop width without non-uniform distortion.
- Do not reintroduce `scale(x, y)` non-uniform scaling. It visibly distorts controls and icons.
- The screen should use proportional scaling only: one uniform scale factor derived from viewport width/height.
- The dead-space/background outside the scaled frame must remain a flat solid `#000103`.
- The main screen background layer under the navbar must keep the same rounded top corners as the glass layer above it.
- The paper/background texture below the navbar currently relies on:
  - `MainBackgroundLayer.tsx` + `MainBackgroundRecipe.ts` with tokenized values
  - a dedicated local noise texture image (`src/assets/noise-texture-background.png`)
  - base white + glass tint layer (`rgba(0,0,0,0.004)`) with `5px` blur + paper tint overlay (`rgba(255,255,255,0.2)`)
  - noise blend currently set via recipe (`noiseBlendMode`), do not change ad hoc in component markup

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
- Current top-right order: `Save` -> `Import` -> (`Play`, `Info`, `Settings`).
- `Play`/`Info`/`Settings` use a shared `GlassIconButton` (`34.42x34.42`) with:
  - outer white border ring as the true border (not inner stroke)
  - clipped liquid-glass layer to avoid square overflow artifacts.
- `Import` uses a dedicated `GlassImportButton` (`105x49`) with the same outer-border-ring strategy.
- The spacing between `Play`/`Info`/`Settings` is intentionally tighter than the outer group gap (`21.75px` internal trio gap).

## Sidebar Notes

- File: `src/screens/FinalFrame/sections/CharacterCreationSidebarSection/CharacterCreationSidebarSection.tsx`
- There was a redundant shadow/card layer behind the sidebar in `FinalFrame.tsx`; it has already been removed.
- Sidebar content is now mode-aware via `mode` prop from `FinalFrame.tsx`:
  - `create`/`variation`: existing create-state content
  - `edit`: Figma-matched edit-state content (header text/icon + middle controls)
- The resize-sidebar handle has been manually refined and now uses two render paths:
  - expanded state: custom `ExpandedResizeSidebarHandleIcon` with `liquid-glass-react`
  - collapsed state: Figma-derived `17:4914` structure for immediate arrow visibility and glass behavior.
- Expanded resize-handle specifics to preserve:
  - arrow points left
  - arrow color is `#999999`
  - border ring is the outer edge (not an inner stroke)
  - includes additional white fill overlay at `50%` opacity.
- Sidebar carousel left/right arrow buttons (`SidebarCarousel.tsx`) now follow the same liquid-glass treatment as the resize handle:
  - centered arrows
  - arrow color `#999999`
  - white fill overlay at `50%` opacity.
- Upload media icon area:
  - keep the round glass background container
  - cloud glyph is custom inline SVG centered in `34x25`
  - avoid reintroducing black outline/stroke from prior asset stacking.
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
- Current full-screen source-of-truth node for this screen: `126:158` (not the older background-only `61:1854`).
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
- `src/screens/FinalFrame/sections/PreviewStageSection/MainBackgroundLayer.tsx`
  - owns layer stack ordering for white/glass/noise and navbar overlap behavior
- `src/screens/FinalFrame/sections/PreviewStageSection/MainBackgroundRecipe.ts`
  - central source of truth for blur/tint/noise blend knobs; changing recipe values can shift whole-screen look
- `src/screens/FinalFrame/sections/CharacterCreationSidebarSection/CharacterCreationSidebarSection.tsx`
  - many absolute layers overlap; small changes can create duplicate-card or shadow artifacts
  - contains drag state machine for expand/collapse thresholds
  - contains fixed-width Figma-style create button styling that is sensitive to subtle effect changes
  - now contains expanded resize-handle liquid-glass implementation where small stroke/rotation/overlay changes are highly visible
  - contains edit-mode selection geometry (left focus toggle + person/shield selector) where 1-2px offsets are visibly wrong
- `src/screens/FinalFrame/sections/CharacterCreationSidebarSection/SidebarCarousel.tsx`
  - arrow button liquid-glass overlays and border rings are sensitive to tiny centering/opacity changes

## Recommended Session Workflow

1. Run `git status`
2. Start dev server with `npm run dev`
3. Inspect the exact component/file before editing
4. If a Figma link is involved, fetch node context and screenshot first
5. Make a minimal patch
6. Run `npm run build`
7. Commit only after visual confirmation or a precise user-approved stop point

# Plan - Remove "Marcos" from Team Section

The user wants to remove the character "Marcos" from the site. I found "Marcos" in the `EquipeFacility` component within `src/routes/index.tsx`.

## Proposed Changes

### `src/routes/index.tsx`

- Remove the `Marcos` object from the `team` array inside the `EquipeFacility` function (around line 998).
- Remove the unused import of `equipeMarcosAsset` (line 39) and the constant `equipeMarcos` (line 44).

## Validation Plan

- Verify that the "Equipe Facility" section no longer displays "Marcos".
- Ensure the marquee animation still works correctly with the remaining team members.
- Check for any build errors due to unused imports or variables.

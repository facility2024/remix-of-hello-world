# Plan - Ensure "Marcos" is fully removed

The user reports that "Marcos" still appears on the live site even after the code was updated. I have verified that in the current local codebase (`src/routes/index.tsx`), the references to Marcos are gone. However, the asset file still exists.

## Proposed Changes

### Clean up assets
1. Delete `src/assets/equipe-marcos.png.asset.json` to ensure no orphaned references exist.

## Verification Plan

### Automated Tests
1. Run `rg -i "marco" src/` to ensure no functional code contains the name.

### Manual Verification
1. I will inform the user that the code is clean locally and they must **Publish** the app in Lovable and then **Redeploy** in Easypanel for the changes to take effect on their domain.

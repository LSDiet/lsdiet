

## Fix: PDF Download Filename Mismatch

### The Problem
The download is failing because the filename in your code doesn't match the actual filename in storage:
- **Code expects**: `Does_GLP-1_work_for_weight_loss.pdf`
- **Storage has**: `Does GLP-1 work for weight loss.pdf`

### The Solution
Update the file path in `src/pages/FreeResources.tsx` to match the exact filename in storage.

### Change Details

**File**: `src/pages/FreeResources.tsx`

**Line 26** - Update `filePath`:
```
FROM: filePath: 'Does_GLP-1_work_for_weight_loss.pdf',
  TO: filePath: 'Does GLP-1 work for weight loss.pdf',
```

### After This Fix
1. The edge function will find the file in storage
2. Downloads will work on both laptop and mobile
3. You can then publish the site


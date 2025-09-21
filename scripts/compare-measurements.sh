#!/bin/bash

# Compare measurements script for refactoring progress
echo "📊 Comparing refactoring measurements..."

# Create measurements directory if it doesn't exist
mkdir -p measurements

# Find latest baseline and progress files
LATEST_BASELINE=$(ls -t measurements/baseline-*.txt 2>/dev/null | head -1)
LATEST_PROGRESS=$(ls -t measurements/progress-*.txt 2>/dev/null | head -1)

if [ ! -f "$LATEST_BASELINE" ]; then
    echo "❌ No baseline found. Run 'npm run measure:before' first."
    exit 1
fi

if [ ! -f "$LATEST_PROGRESS" ]; then
    echo "❌ No progress found. Run 'npm run measure:after' first."
    exit 1
fi

echo "📈 COMPARISON REPORT"
echo "==================="
echo "Baseline: $LATEST_BASELINE"
echo "Progress: $LATEST_PROGRESS"
echo ""

# Extract and compare component sizes
echo "🔍 COMPONENT SIZE CHANGES"
echo "========================="
echo "Before (Baseline):"
grep -A 10 "Component Sizes" "$LATEST_BASELINE" | head -11
echo ""
echo "After (Progress):"
grep -A 10 "Component Sizes" "$LATEST_PROGRESS" | head -11
echo ""

# Extract and compare total lines
echo "📏 TOTAL LINES OF CODE"
echo "======================"
BASELINE_LINES=$(grep "total" "$LATEST_BASELINE" | tail -1 | awk '{print $1}')
PROGRESS_LINES=$(grep "total" "$LATEST_PROGRESS" | tail -1 | awk '{print $1}')

if [ -n "$BASELINE_LINES" ] && [ -n "$PROGRESS_LINES" ]; then
    DIFF=$((PROGRESS_LINES - BASELINE_LINES))
    PERCENT_CHANGE=$(echo "scale=2; ($DIFF * 100) / $BASELINE_LINES" | bc -l 2>/dev/null || echo "0")
    
    echo "Before: $BASELINE_LINES lines"
    echo "After:  $PROGRESS_LINES lines"
    echo "Change: $DIFF lines ($PERCENT_CHANGE%)"
    
    if [ $DIFF -lt 0 ]; then
        echo "✅ Lines reduced by ${DIFF#-} lines"
    elif [ $DIFF -gt 0 ]; then
        echo "⚠️  Lines increased by $DIFF lines"
    else
        echo "➖ No change in total lines"
    fi
else
    echo "❌ Could not extract line counts"
fi
echo ""

# Extract and compare console statements
echo "🐛 CONSOLE STATEMENTS"
echo "====================="
BASELINE_CONSOLE=$(grep "Console statements:" "$LATEST_BASELINE" | awk '{print $3}')
PROGRESS_CONSOLE=$(grep "Console statements:" "$LATEST_PROGRESS" | awk '{print $3}')

if [ -n "$BASELINE_CONSOLE" ] && [ -n "$PROGRESS_CONSOLE" ]; then
    DIFF=$((PROGRESS_CONSOLE - BASELINE_CONSOLE))
    echo "Before: $BASELINE_CONSOLE console statements"
    echo "After:  $PROGRESS_CONSOLE console statements"
    echo "Change: $DIFF statements"
    
    if [ $DIFF -lt 0 ]; then
        echo "✅ Console statements reduced by ${DIFF#-}"
    elif [ $DIFF -gt 0 ]; then
        echo "⚠️  Console statements increased by $DIFF"
    else
        echo "➖ No change in console statements"
    fi
else
    echo "❌ Could not extract console statement counts"
fi
echo ""

# Extract and compare switch statements
echo "🔄 SWITCH STATEMENTS"
echo "===================="
BASELINE_SWITCH=$(grep "Switch statements:" "$LATEST_BASELINE" | awk '{print $3}')
PROGRESS_SWITCH=$(grep "Switch statements:" "$LATEST_PROGRESS" | awk '{print $3}')

if [ -n "$BASELINE_SWITCH" ] && [ -n "$PROGRESS_SWITCH" ]; then
    DIFF=$((PROGRESS_SWITCH - BASELINE_SWITCH))
    echo "Before: $BASELINE_SWITCH switch statements"
    echo "After:  $PROGRESS_SWITCH switch statements"
    echo "Change: $DIFF statements"
    
    if [ $DIFF -lt 0 ]; then
        echo "✅ Switch statements reduced by ${DIFF#-}"
    elif [ $DIFF -gt 0 ]; then
        echo "⚠️  Switch statements increased by $DIFF"
    else
        echo "➖ No change in switch statements"
    fi
else
    echo "❌ Could not extract switch statement counts"
fi
echo ""

echo "📋 SUMMARY"
echo "=========="
echo "✅ Use this comparison to track your refactoring progress"
echo "📁 Full reports saved in measurements/ directory"
echo "🔄 Run 'npm run measure:after' after each phase to update progress"

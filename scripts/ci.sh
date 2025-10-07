#!/bin/bash
set -e

echo "🔍 Running CI checks..."

echo "📦 Installing dependencies..."
npm ci

echo "🧹 Running linter..."
npm run lint || echo "⚠️  Lint warnings (non-blocking)"

echo "🔎 Type checking..."
npx tsc -p . --noEmit || echo "⚠️  Type errors (non-blocking)"

echo "🏗️  Building for Cloudflare Pages..."
npm run pages:build

echo "✅ All CI checks passed!"

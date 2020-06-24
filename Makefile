test:
	deno test --allow-net init.ts

bundle:
	deno bundle worldtides.ts > bundle.js

.PHONY: test bundle
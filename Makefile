all:
	@npm run dev

test:
	@node --experimental-vm-modules node_modules/jest/bin/jest.js
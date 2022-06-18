all:
	@make install
	@make run

install:
	@npm install

run:
	@npm run dev

test:
	@node --experimental-vm-modules node_modules/jest/bin/jest.js
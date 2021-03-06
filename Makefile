install: npm-install bower-install

test: test-all

test-all:
	PORT=4000 NODE_ENV=test ./node_modules/mocha/bin/mocha --check-leaks

test-browser:
	./node_modules/karma/bin/karma run

test-watch:
	PORT=4000 NODE_ENV=test ./node_modules/mocha/bin/mocha --check-leaks --watch

test-xunit:
	PORT=4000 NODE_ENV=test ./node_modules/mocha/bin/mocha --check-leaks -R xunit > \
		$$WORKSPACE/$$BUILD_NUMBER_results.xml

npm-install:
	npm install

bower-install:
	grunt bowercopy

cov:
	PORT=4000 NODE_ENV=test ./node_modules/istanbul/lib/cli.js cover \
		./node_modules/mocha/bin/_mocha -- --check-leaks -R spec


clean:
	rm -rf coverage
	rm -rf node_modules

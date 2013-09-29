install: npm-install bower-install

test-all:
	NODE_ENV=test ./node_modules/mocha/bin/mocha --check-leaks

test-xunit:
	NODE_ENV=test ./node_modules/mocha/bin/mocha --check-leaks -R xunit > \
		$$WORKSPACE/$$BUILD_NUMBER_results.xml

npm-install:
	npm install

bower-install:
	bower install

cov:
	NODE_ENV=test ./node_modules/istanbul/lib/cli.js cover \
		./node_modules/mocha/bin/_mocha -- --check-leaks -R spec

clean:
	rm -rf coverage
	rm -rf node_modules
	rm -rf lib/public/js/vendor

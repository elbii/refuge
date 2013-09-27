test-leaks:
	NODE_ENV=test ./node_modules/mocha/bin/mocha --check-leaks

test-cov: cov
	REFUGE_COV=1 NODE_ENV=test ./node_modules/mocha/bin/mocha --reporter html-cov \
		--check-leaks > coverage.html; open coverage.html

clean:
	rm -rf lib-cov
	rm coverage.html
	rm -rf node_modules
	rm -rf lib/public/js/vendor

cov:
	jscoverage --no-highlight --no-instrument=public/js/vendor lib lib-cov

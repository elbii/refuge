test-leaks:
	NODE_ENV=test ./node_modules/mocha/bin/mocha --check-leaks

test-jenkins-xunit:
	NODE_ENV=test ./node_modules/mocha/bin/mocha --check-leaks -R xunit > \
					 $WORKSPACE/results/Refuge_Test_Suite_$BUILD_NUMBER.xml

test-jenkins-html-cov: cov
	REFUGE_COV=1 NODE_ENV=test ./node_modules/mocha/bin/mocha --reporter html-cov \
		--check-leaks > coverage.html

test-html-cov: cov test-jenkins-html-cov
	open coverage.html

clean:
	rm -rf lib-cov
	rm coverage.html
	rm -rf node_modules
	rm -rf lib/public/js/vendor

cov:
	jscoverage --no-highlight --no-instrument=public/js/vendor lib lib-cov

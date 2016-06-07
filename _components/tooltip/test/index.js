
//	Set-up BDD Mocha instance
mocha.setup({
	ui: 'bdd'
});

//	Reference helpers
function defer (done, fn, duration) {
	setTimeout(function () {
		try {
			fn();
			done();
		} catch (e) {
			done(e);
		}
	}, duration || 0);
}
function eventClick (elem) {
	//	create new click event
	var event = new Event('click');
	//	dispatch event on the element and return to parent
	elem.dispatchEvent(event);
	return event;
}
function eventKeydown (keyCode, shiftKey) {
	//	create new keydown event and assign values
	var event = new Event('keydown');
	event.keyCode = keyCode;
	event.shiftKey = shiftKey || false;
	//	dispatch event on the document and return to parent
	document.dispatchEvent(event);
	return event;
}
function eventMouseover (elem) {
	//	create new click event
	var event = new Event('mouseover');
	console.log(event);
	//	dispatch event on the element and return to parent
	elem.dispatchEvent(event);
	return event;
}

//	Test suite
describe('frtooltip', function () {

	//	Get assertion lib
	var expect = chai.expect;

	//	Hide test DOM once complete
	after(function () {
		document.querySelector('.tests').setAttribute('hidden', true);
	});

	//	Set-up
	describe('set-up', function () {
		//	Run frtooltip instance
		var instance = Frtooltip({ selector: '#tooltip-1' });
		//	Get instance elements
		var container = document.getElementById('tooltip-1');
		var toggle = container.querySelector('.js-fr-tooltip-toggle');
		var tooltip = container.querySelector('.js-fr-tooltip-tooltip');
		//	Run test-cases
		it('container should have ready class', function () {
			expect([].slice.call(container.classList)).to.contain('fr-tooltip--is-ready');
		});
		it('toggle aria-expanded should equal false', function () {
			expect(toggle.getAttribute('aria-expanded')).to.equal('false');
		});
		it('tooltip should have role of tooltip', function () {
			expect(tooltip.getAttribute('role')).to.equal('tooltip');
		});
		it('tooltip should have aria-live of polite', function () {
			expect(tooltip.getAttribute('aria-live')).to.equal('polite');
		});
	});

	//	Destroy
	describe('destroy', function () {
		//	Run frtooltip instance
		var instance = Frtooltip({ selector: '#tooltip-2' });
		//	Get instance elements
		var container = document.getElementById('tooltip-2');
		var tooltip = container.querySelector('.js-fr-tooltip-tooltip');
		//	Destroy instance
		before(function(done) {
			defer(done, instance.destroy);
		});
		//	Run test-cases
		it('container should not have ready class', function () {
			expect([].slice.call(container.classList)).to.not.contain('fr-tooltip--is-ready');
		});
		it('toggle should not have aria-expanded', function () {
			//	Get instance elements once destroyed (DOM element replacement)
			var toggle = container.querySelector('.js-fr-tooltip-toggle');
			expect(toggle.getAttribute('aria-expanded')).to.not.exist;
		});
		it('tooltip should not have role of tooltip', function () {
			expect(tooltip.getAttribute('role')).to.not.equal('tooltip');
		});
		it('tooltip should not have aria-live', function () {
			expect(tooltip.getAttribute('aria-live')).to.not.exist;
		});
	});

	//	Interact
	describe('user interactions', function () {
		//	Run frtooltip instance
		var instance = Frtooltip({ selector: '#tooltip-3' });
		//	Get instance elements
		var container = document.getElementById('tooltip-3');
		var toggle = container.querySelector('.js-fr-tooltip-toggle');
		var tooltip = container.querySelector('.js-fr-tooltip-tooltip');
		//	Run test-cases
		it('on enter, toggle should have correct aria-describedby', function () {
			toggle.focus();
			eventClick(toggle);
			expect(toggle.getAttribute('aria-describedby')).to.equal(tooltip.getAttribute('id'));
		});
		it('after opening, toggle should have aria-expanded of true', function () {
			expect(toggle.getAttribute('aria-expanded')).to.equal('true');
		});
		it('after opening, tooltip should have aria-hidden of false', function () {
			expect(tooltip.getAttribute('aria-hidden')).to.equal('false');
		});
	});
});

//	Run Mocha test
mocha.checkLeaks();
mocha.run();
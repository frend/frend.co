
//	Set-up BDD Mocha instance
mocha.setup({
	ui: 'bdd'
});

//	Reference helpers
function defer (done, fn) {
	setTimeout(function () {
		try {
			fn();
			done();
		} catch (e) {
			done(e);
		}
	}, 0);
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

//	Test suite
describe('frbypasslinks', function () {

	//	Get assertion lib
	var expect = chai.expect;

	//	Hide test DOM once complete
	after(function () {
		document.querySelector('.tests').setAttribute('hidden', true);
	});

	//	Interact
	describe('user interactions', function () {
		//	Run frdialogmodal instance
		var instance = Frbypasslinks({ selector: '#bypass-1' });
		//	Get instance elements
		var link = document.getElementById('bypass-link');
		var target = document.getElementById('bypass-target');
		//	Run test-cases
		it('on link click, target should be focused', function () {
			eventClick(link);
			expect(document.activeElement).to.equal(target);
		});
		it('on target click, target should not be focused', function () {
			target.blur();
			eventClick(target);
			expect(document.activeElement).to.not.equal(target);
		});
		it('on tab, target should not be focused', function () {
			link.focus();
			eventKeydown(9);
			expect(document.activeElement).to.not.equal(target);
		});
	});
});

//	Run Mocha test
mocha.checkLeaks();
mocha.run();
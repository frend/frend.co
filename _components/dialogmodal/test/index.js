
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
describe('frdialogmodal', function () {

	//	Get assertion lib
	var expect = chai.expect;

	//	Hide test DOM once complete
	after(function () {
		document.querySelector('.tests').setAttribute('hidden', true);
	});

	//	Set-up
	describe('set-up', function () {
		//	Run frdialogmodal instance
		var instance = Frdialogmodal({ selector: '#modal-1' });
		//	Get instance elements
		var container = document.getElementById('modal-1');
		var modal = container.querySelector('.js-fr-dialogmodal-modal');
		var modalDoc = modal.querySelector('[role="document"]');
		//	Run test-cases
		it('container should have aria-hidden attribute', function () {
			expect(container.getAttribute('aria-hidden')).to.equal('true');
		});
		it('container should have ready class', function () {
			expect([].slice.call(container.classList)).to.contain('fr-dialogmodal--is-ready');
		});
		it('modal should have role of dialog', function () {
			expect(modal.getAttribute('role')).to.equal('dialog');
		});
		it('modal aria-describedby attribute should match modal documents id', function () {
			expect(modal.getAttribute('aria-describedby')).to.equal(modalDoc.getAttribute('id'));
		});
	});

	//	Destroy
	describe('destroy', function () {
		//	Run frdialogmodal instance
		var instance = Frdialogmodal({ selector: '#modal-2' });
		//	Get instance elements
		var container = document.getElementById('modal-2');
		var modal = container.querySelector('.js-fr-dialogmodal-modal');
		//	Destroy instance
		before(function(done) {
			defer(done, instance.destroy);
		});
		//	Run test-cases
		it('container should not have aria-hidden attribute', function () {
			expect(container.getAttribute('aria-hidden')).to.not.exist;
		});
		it('container should not have ready class', function () {
			expect([].slice.call(container.classList)).to.not.contain('fr-dialogmodal--is-ready');
		});
		it('modal should not have role of dialog', function () {
			expect(modal.getAttribute('role')).to.not.exist;
		});
		it('modal should not have aria-describedby attribute', function () {
			expect(modal.getAttribute('aria-describedby')).to.not.exist;
		});
	});

	//	Interact
	describe('user interactions', function () {
		//	Run frdialogmodal instance
		var instance = Frdialogmodal({ selector: '#modal-3' });
		//	Get instance elements
		var container = document.getElementById('modal-3');
		var modal = container.querySelector('.js-fr-dialogmodal-modal');
		var open = document.getElementById('open-modal-3');
		var close = document.getElementById('close-modal-3');
		var firstItem = document.getElementById('first-modal-3');
		//	Run test-cases
		it('on open-button click, container should have false aria-hidden', function () {
			eventClick(open);
			expect(container.getAttribute('aria-hidden')).to.equal('false');
		});
		it('after open-button click, container should gain focus', function () {
			expect(document.activeElement).to.equal(modal);
		});
		it('on shift-tab key, last item in modal should gain focus', function (done) {
			defer(done, function () {
				eventKeydown(9, true);
				expect(document.activeElement).to.equal(close)
			});
		});
		it('on tab key, first item in modal should gain focus', function (done) {
			defer(done, function () {
				eventKeydown(9);
				expect(document.activeElement).to.equal(firstItem);
			});
		});
		it('on esc key, container should have true aria-hidden', function (done) {
			defer(done, function () {
				eventKeydown(27);
				expect(container.getAttribute('aria-hidden')).to.equal('true');
			});
		});
		it('after modal close, open-button should gain focus', function () {
			expect(document.activeElement).to.equal(open);
		});
		it('on close-button click, container should have false aria-hidden', function (done) {
			eventClick(open);
			defer(done, function () {
				eventClick(close);
				expect(container.getAttribute('aria-hidden')).to.equal('true');
			});
		});
	});

	//	Custom
	describe('custom options', function () {
		//	Run frdialogmodal instance
		var instance = Frdialogmodal({
			selector: '#modal-4',
			isAlert: true,
			readyClass: 'test-ready',
			activeClass: 'test-active'
		});
		//	Get instance elements
		var container = document.getElementById('modal-4');
		var modal = container.querySelector('.js-fr-dialogmodal-modal');
		var open = document.getElementById('open-modal-4');
		//	Run test-cases
		it('isAlert set to true, modal should have role of alertdialog', function () {
			expect(modal.getAttribute('role')).to.equal('alertdialog');
		});
		it('readyClass set to test-ready, container should have class of test-ready', function () {
			expect([].slice.call(container.classList)).to.contain('test-ready');
		});
		it('activeClass set to test-active, container should have class of test-active', function () {
			eventClick(open);
			expect([].slice.call(container.classList)).to.contain('test-active');
		});
	});
});

//	Run Mocha test
mocha.checkLeaks();
mocha.run();
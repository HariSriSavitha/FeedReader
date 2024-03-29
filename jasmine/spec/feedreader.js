/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty.
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('URL defined', () => {

      for (let feeds in allFeeds) {
        expect(allFeeds[feeds].url).not.toBeFalsy();
      }
    });
    /* test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('name defined', function() {
      for (let variable of allFeeds) {
        expect(variable.name).toBeTruthy();
      }
    });
  });


  /*  new test suite named "The menu" */

  describe("The menu", function() {

    /* test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */

    it("menu hidden", function() {
      expect($('body').hasClass('menu-hidden')).not.toBe(0);
    });

    //The below code can also be used to test that ensures the menu element is hidden by default.
    // it("menu hidden", function() {
    // var menuHide = document.getElementsByClassName("menu-hidden");
    // expect(menuHide).toBeDefined();
    // expect(menuHide).not.toBe(0);
    // });



    /* test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    //
    it("you have clicked menu icon,visibility changed", function() {

      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBeFalsy();


      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBeTruthy();

    });
  });


  /*  new test suite named "Initial Entries" */
  describe("Initial Entries", function() {
    beforeEach(function(done) {
      //loads request
      loadFeed(0, function() {
        //callback for once request is loaded
        done();
      });
    });
    /* test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    it("there is at least a single .entry element within the .feed container.", function(done) {
      var feedList = $('.feed .entry')[0];
      console.log(feedList);
      expect(feedList).toBeGreaterThan('');
      done();
    });


  });
  /* new test suite named "New Feed Selection" */

  /* test that ensures when a new feed is loaded
   * by the loadFeed function that the content actually changes.
   * Remember, loadFeed() is asynchronous.
   */
  describe('New Feed Selection', function() {

    // tests that new content is loaded by loadFeed().
    var firstfeed;
    var secondfeed;

    beforeEach(function(done) {
      loadFeed(0, function() {
        firstfeed = $('.feed').html();
        done();
      });
    });

    it('should change feed content after loading feed', function(done) {
      loadFeed(1, function() {
        secondfeed = $('.feed').html();
        expect(secondfeed).not.toEqual(firstfeed);
        done();
      });
    });
  });
}());

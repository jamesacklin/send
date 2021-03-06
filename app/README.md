# 🤙 Send

Send is a JavaScript-powered Progressive Web Application for browsing and reading articles from Dirt Rag Magazine. It is written in Vue.js using the Nuxt framework and is powered by the WordPress API with a few Advanced Custom Fields. In essence, it is an example of a "headless" CMS.

## Component and Page Tour

Send is constructed from a series of components, which are assembled into pages and hydrated with data from the WordPress API. This approach does several things:

1. The app users interact with to read, comment on, and share articles from Dirt Rag lives on a different server than the WordPress installation which houses business-critical content.
2. It keeps the WordPress installation clean—there is no need for plugins or special functionality (other than a few technical operational plugins) which clutter the installation, make the process brittle, and make Dirt Rag difficult to maintain.
3. It allows us to develop, test, and release new versions of Send (in other words, make functional and style updates to the site) without touching WordPress at all—therefore mitigating the risk of taking the site down with a simple change.

Send's component architecture allows the front-end developer to re-use as much code as possible without needing to maintain small bits of code spread throughout the entire application.

This README only addresses the composition and end-user functionality; technical details and notes on data are available as comments in the uncompiled code.

---

## Global Components

The Send application is designed with several global components, which always stay in view, framing the current page. We are able to re-render these global components based on the URL of the current page, but they are mostly designed to live in a static location and are thus not subject to animations.

### Header

The global header contains a three-line "hamburger" button to toggle the navigation drawer (small screens), a Dirt Rag logo, a search bar, and a horizontal navigation bar (large screens). The logo is available in either horizontal or vertical format, and is available as white text on a solid background of any color.

When the user scrolls down on the page, the menu button, Dirt Rag logo, and all navigational elements scroll with them.

### Navigation

On small screens, the navigation element is primarily a full-screen drawer which appears when the user clicks or taps the hamburger button and disappears when the user clicks or taps the "X" button in the drawer itself. The drawer contains a Dirt Rag logo, an "X" close button, a search box, some navigation items, and a copyright footer.

On larger screens, the navigation items sort themselves into a horizontally justified list along the top of the screen, along with the search box.

Users can search for posts or pages using the search box. This uses WordPress's internal search functionality and is not as fast as, say, a third-party service which handles substring matching and autocomplete. Therefore, users must press Enter or submit their search before any search results will appear. Search results appear in a dropdown box under the field, ranked by WordPress's calculation of relevance. The user can click or tap on any result to be taken to that post or page. The user can also clear the search by clicking or tapping the "Clear" button in the field itself.

The navigation links with red backgrounds point to categories which Dirt Rag pre-defined as the main sections or channels of the site. Users can click or tap on a category name and are taken to that category listing. This list of categories is maintained within Send's source code and is not powered by WordPress. There are also external navigation links, designated by a blue background for contrast. These links are also maintained within Send's source code.

### Footer

The footer appears below every list of posts, page, or post. The footer contains a list of page links, maintained within Send's source code and not powered by WordPress. There is ample room to place a banner ad in the future.

### Pagination

The pagination component, like the header, scrolls with the user as they navigate the site. The pagination links offer a kind of easily-reachable, secondary navigation between pages of article lists and from posts themselves back to the listing. 

Because the pagination component is designed to react and change itself based on whichever page the user is on, there are lots of opportunities to add additional funtionality here. Currently, users can only return to Home from an article or page, and navigate between pages of post listings. However, one could easily imagine a "Next article" link, which takes the user to an automatically-defined article, or one which has been designated by a Dirt Rag staffer. For example, if the user is reading an article about wellness and diet, and Editorial has established a relationship between this post and another from 2013 about the benefits of active recovery, it would make sense to link the user to this post from the global pagination.

### Other Global Features

Each page, article, or index view in Send has the appropriate data for linking to the page via social media.

---

## Index Pages

The index or home page of the site is home to the first page of posts from Dirt Rag, sorted by newest first. This index page contains a large hero or section header, a feed of posts, and some advertisements. Each subsequent page of posts follows the exact same layout and functionality, just with different posts. The index page is available though the URL route `https://www.dirtragmag.com/`. Subsequent pages of posts are available at `https://www.dirtragmag.com/page/#`.

### Section Header

The Section Header component is configurable from WordPress with the author's choice of background image, headline text, headline copy, and a small figure image. This header area is designed to be as flexible as possible for whatever messaging Dirt Rag decides to push at any given time. At launch time, this header contained messaging about the latest print edition of the magazine, but can be configured to display an announcement for the upcoming Dirt Fest event, for example.

The section header as configured on the home page also appears on each subsequent page of posts.

### Feed

The feed of posts is driven by the WordPress API. Currently, the feed displays 30 posts at a time. Each page of posts is a set of 30 posts—so the URL route `/` (page 1) shows posts 1-30, `/page/2` shows posts 31-60, and so on.

Depending on the type of device the reader is browsing the site with, the feed will either return 30 posts as-is for desktop-like browsers, or—for mobile-like devices—will insert a Google ad every 3 posts for a total of 10 available slots in the feed. Each of these slots corresponds to a Google Ad from Dirt Rag's Doubleclick for Publishers account. The overall effect is a stream of posts with the occasional interruption of an ad, much like Facebook, Twitter, or any modern application with a feed of content interspersed with advertising.

### PostAtom

Each post on an index page is rendered via the PostAtom component. The PostAtom component is essentially a representaiton of a post's metadata as a single item in the feed. The PostAtom contains a featured image, the post's title, author, date of publishing, and excerpt—all set by fields in WordPress. Featured images are loaded asyncronously—which is to say, all 30 posts' featured images are not loaded at the same time when a user visits the page; each image loads when it scrolls into view. This results in a much lighter page load on initial visit and a seamless browsing experience thereafter. There is no need to worry about setting a post's Featured Image to a specific size—the front-end handles serving appropriately-sized images to each screen size.

The PostAtom can be adjusted for slightly different display modes in the feed—`default`, `enhanced`, and `promotion`. Authors can set each post's mode or feed appearance from WordPress. Posts in the **Contests** category are automatically set to `promotion`, which removes the post author, date, and excerpt, sets the Featured Image as the background, and gives it a full-width callout treatment with a red border. The `enhanced` mode makes the Featured Image and text size larger, and moves the title and author data over the excerpt. This could be useful for posts which Editorial wants to drive readers' attention toward.

The PostAtom component also has provisions for things like title callouts ("Holiday Gift Guide:") or direct action buttons ("Watch Now →"), which could be set from WordPress. This has not been implemented yet.

### Advertising

Advertising components are instances of the Google Doubleclick for Publishers page tag manager. The slots themselves are baked into Send's source code and are not accessible through WordPress; they are only available to change through the Google Ad Manager panel. The AdSidebar and AdHeader components show up above and/or next to feeds or post/page contents.

---

## Category Index Pages

Category pages are almost identical to index pages, with the exception of the posts being filtered to the euponomous category of posts. Nearly everything is the same—the feed handles advertisements exactly the same as normal index pages, PostAtoms exhibit the same behavior, and so on. However, the Section Header differs slightly. Category index pages are accessible through the URL route `https://www.dirtragmag.com/category/slug`, where "slug" is an automatically-generated string from the category name in WordPress. Subsequent pages of posts are available at `https://www.dirtragmag.com/category/slug/page/#`.

### Category Section Header

The category section header component is similar to the one which appears on the home or index page, but its options are set from the Category configuration screen in WordPress. The category section header can accept a background image, a corporate sponsor, and a sponsor's logo. Therefore, it is theoretically possible for a company to sponsor a category of Dirt Rag (like Gear or News). It would be possible to add a link to an sponsor company's website with the logo, but this has not been implemented yet.

---

## Article Pages

Article pages display a given post's content using the URL template `https://www.dirtragmag.com/articles/slug`. The "slug" is automatically generated by WordPress from the post's title, but is also able to be redefined from within WordPress itself. Each article page is comprised of a Featured Media block, an AdHeader component, the post content, contest widgets, a comment block, and an AdSidebar component.

### Featured Media

The Featured Media block works much like the Featured Image block in the PostAtom component. When composing a post, the author provides a large photo as the Featured Media and the front-end handles the rest, loading the appropriate size photo for whichever screen size the reader is displaying the article on. The Featured Media block is cropped to a 16:9 ratio, so 16:9 images work best here.

In the future, the Featured Media block will become more than static images—our intent is to make this region a video player, a photo slideshow, or house any other kind of media Dirt Rag sees fit to feature.

### Post Content

The post content comes straight from the post editor in WordPress without any secondary processing. Therefore, whatever the author provides to WordPress will be output as such. There is no secondary text processing other than some occasional hyphenation.

An important note: because Send is built with JavaScript, `<script>` tag-style embeds in the body of WordPress posts **do not work** and **will not appear** on the article page. This is a technical limitation of rendering content asyncronously in an app framework. We strongly ecourage authors to use `<iframe>`-style embeds wherever possible, such as YouTube or Vimeo's default embed code. This may be especially applicable to things like giveaways or contests, which may use one third-party platform or another with its own embeddable widget. See "Contests" below for the exception.

### Contests

Contest posts have an optional field in WordPress in which to drop either SurveyMonkey or Rafflecopter embed codes. A considerable amount of time and effort went into supporting these platforms specifically. There are some non-trivial operations in Send's source code to handle and render Rafflecopter and SurveyMonkey widgets into the article page in the right spot—below the post content and above the comments. We recommend sticking to Rafflecopter and Surveymonkey for embedded contest and giveaway widgets for the time being. 

We can always explore more integrations—especially if Dirt Rag forsees a contest provider becoming a long-time partner, but as a general rule, developers do not like to support one-off third-party services adding whatever they like to their nice clean codebase. :)

### Comments

Article comments are handled via a Disqus plugin. Disqus was chosen for its machine-learning capabilities in flagging abusive or spammy comments and to abstract comment entry and storage away from Dirt Rag's servers. (With the volume of traffic Dirt Rag sees, it makes sense to keep as many assets or auxillary pieces of content off Dirt Rag's servers as possible.) Users can comment upon or react to (with Emoji) an article using the Disqus platform and Dirt Rag staffers have the ability to moderate comments through the Disqus admin panel.

### AdHeader and AdSidebar

Advertising components are instances of the Google Doubleclick for Publishers page tag manager. The slots themselves are baked into Send's source code and are not accessible through WordPress; they are only available to change through the Google Ad Manager panel. The AdSidebar and AdHeader components show up above and/or next to feeds or post/page contents.

## Pages

Pages are nearly identical to Posts, except they lack a Featured Media block, comments, or contest integrations. Pages are accessible via the URL template `https://www.dirtragmag.com/slug`, where "slug" is an automatically-generated string from the page title in WordPress.

---

## Running Send

Assuming you are not running Send within a Docker container (recommended; see root of the repository), you can run the following commands in the root of this file (`/app`) to run the project locally on your own computer or on a server of your choosing.

Install project dependencies locally into /app/node_modules:
```
npm install
```

Compile and hot-reload for development on port 3000:
```
npm run serve
```

Compile and minifiy for production:
```
npm run build
```

Run the Nuxt server on port 3000:
```
npm run start
```

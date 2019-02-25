# Send

Send is a JavaScript-powered Progressive Web Application for browsing and reading articles from Dirt Rag Magazine. It is written in Vue.js using the Nuxt framework and is powered by the WordPress API with a few Advanced Custom Fields. In essence, it is an example of a "headless" CMS.

## Component and Page Tour

Send is constructed from a series of components, which are assembled into pages and hydrated with data from the WordPress API. This approach does several things:

1. The app users interact with to read, comment on, and share articles from Dirt Rag lives on a different server than the WordPress installation which houses business-critical content.
2. It keeps the WordPress installation clean—there is no need for plugins or special functionality (other than a few technical operational plugins) which clutter the installation, make the process brittle, and make Dirt Rag difficult to maintain.
3. It allows us to develop, test, and release new versions of Send (in other words, make functional and style updates to the site) without touching WordPress at all—therefore mitigating the risk of taking the site down with a simple change.

Send's component architecture allows the front-end developer to re-use as much code as possible without needing to maintain small bits of code spread throughout the entire application.

This README only addreses the composition and end-user functionality; technical details and notes on data are available as comments in the uncompiled code.

## Global Components

The Send application is designed with several global components, which always stay in view, framing the current page. We are able to re-render these global components based on the URL of the current page, but they are mostly designed to live in a static location and are thus not subject to animations.

### Header

The global header contains a news ticker, a three-line "hamburger" button to toggle the navigation drawer, a Dirt Rag Logo, and the Outside.tv player. From the post editor in WordPress, authors can control if the post headline and link appears in the ticker and an expiration date, after which the story will not appear in the ticker. The logo is available in either horizontal or vertical format, and is available as white text on a solid background of any color. The Outside.tv player only appears on screen widths larger than roughly 800px, and the user is able to pause the player or view it full screen.

When the user scrolls down on the page, the ticker becomes hidden and the menu button, Dirt Rag logo, and Outside.tv player scroll with the viewport. This is designed to be unobtrusive as possible, while accomplishing the following goals: 

1. Maintaining an accessible navigation drawer toggle
2. Keeping the Dirt Rag logo on the screen at all times
3. Allowing continuous play of the Outside.tv video feed, which positively contributes to revenue

On larger viewports, the Outside.tv player slides behind the Advertising Sidebar to preserve the screen space advertisers pay for.

### Navigation

The navigation element is primarily a full-screen "drawer" which appears when the user clicks or taps the "hamburger" button and disappears when the user clicks or taps the "X" button in the drawer itself. The drawer contains a Dirt Rag logo, an "X" close button, a search box, some navigation items, and a copyright footer.

Users can search for posts or pages using the search box. This uses WordPress's internal search functionality and is not as fast as, say, a third-party service which handles substring matching and autocomplete. Therefore, users must press "Enter" or submit their search before any search results will appear. Search results appear in a dropdown box under the field, ranked by WordPress's calculation of relevance. The user can click or tap on any result to be taken to that post or page. The user can also clear the search by clicking or tapping the "Clear" button in the field itself.

The navigation links with red backgrounds point to categories which Dirt Rag pre-defined as the main "sections" or channels of the site. Users can click or tap on a category name and are taken to that category listing. This list of categories is maintained within Send's source code and is not powered by WordPress. There are also external navigation links, designated by a blue background for contrast. These links are also maintained within Send's source code.

### Footer

The footer appears below every list of posts, page, or post. The footer contains a list of page links, maintained within Send's source code and not powered by WordPress. There is ample room to place a banner ad in the future.

### Pagination

The pagination component, like the header, scrolls with the user as they navigate the site. The pagination links offer a kind of easily-reachable, secondary navigation between pages of article lists and from posts themselves back to the listing. 

Because the pagination component is designed to react and change itself based on whichever page the user is on, there are lots of opportunities to add additional funtionality here. Currently, users can only return to Home from an article or page, and navigate between pages of post listings. However, one could easily imagine a "Next article" link, which takes the user to an automatically-defined article, or one which has been designated by a Dirt Rag staffer. For example, if the user is reading an article about wellness and diet, and Editorial has established a relationship between this post and another from 2013 about the benefits of active recovery, it would make sense to link the user to this post from the global pagination.

```
Forthcoming:
- Index
  - SectionHeader
  - Feed
    - PostAtom
    - Advertising
  - AdHeader
  - AdSidebar

- Category Index

- Article
  - FeaturedMedia
  - Contest
  - Comments
  - AdHeader
  - AdSidebar

- Page
```
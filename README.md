    
<div id="readme" class="readme blob instapaper_body js-code-block-container">
<article class="markdown-body entry-content" itemprop="text"><h1><a id="user-content-yelp-camp" class="anchor" aria-hidden="true" href="#yelp-camp"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Yelp-Camp</h1>
<p>This is a slightly modified version of the Yelp Camp site, which is done at the end of the Colt Steele's <a href="https://www.udemy.com/the-web-developer-bootcamp/">Web Developer Bootcamp course</a> from Udemy.</p>
<p>Notable changes are:</p>
<ul>
<li>Different UI, since the course only leads into a very basic look;</li>
<li>Storing images locally, since cloudinary is potentially a limiting/bottleneck factor;</li>
<li>Compressing and resizing uploaded images with 'sharp' npm module, for optimized site performance and storage;</li>
<li>Uniform display of images in the index page using plain CSS, to make the grid symmetric;</li>
</ul>
<p>Also did most of the optional changes, including:</p>
<ul>
<li>Pricing of campgrounds;</li>
<li>Google maps location (you must provide your own API keys);</li>
<li>Time since campground was created, using Moment JS;</li>
<li>Administrator account/role;</li>
<li>User profile;</li>
<li>Password resetting using Gmail (you must provide your own API keys);</li>
<li>Searching campgrounds in index page;</li>
<li>Uploading images (locally, not using cloudinary);</li>
<li>Migration to Bootstrap 4</li>
</ul>
</article>
</div>

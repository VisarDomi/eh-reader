# eh-reader

A custom reader for sad panda on iPhone iOS 13 that is activated as a bookmarklet

This JavaScript project will allow you to get all the images of the gallery of sad panda in one long strip format, without spaces. It uses the backup links, so there will be no failure of the loading of the images like it usually does.

## Where to activate the script

On the gallery page with large thumbnails

## What this script does

Gets all the images of the gallery of sad panda in one long strip format, without spaces. The script:

  1. first loads all the images in vertical position
  2. then transforms them to horizontal. Set HORIZONTAL to false if you do not want this feature
    - go to sad panda settings and set virtual width to 2100px for best horizontal view in iPhone 10s

## How does a bookmarklet work

A bookmarklet is a bookmark that is edited so that instead of the https://..... you copy and paste the code of minified version of this script. Bookmarks usually allow 20000 characters, and this minified script is 2000 characters, so it works. In other words:

1. Copy code of the minified version of the script
2. Bookmark any webpage
3. Edit this bookmark and click on the little x icon next to the URL to clear the field
4. Paste the minified version of the script
5. Edit the title of this bookmarklet, for example eh-reader
6. Click on Done
7. Go to a gallery in sad panda
8. Make sure that Large thumbnails is clicked and activated
9. Call this bookmarklet and wait
  - make sure that before this you set the virtual width to 2100px in the sad panda settings if you want to zoom out in iPhone 10s


## Useful perks

Some perks are useful for this. You need hath to get perks. To get hath, you either need to donate, run H@H or play HV. Get these perks in this order:

1. All Thumbs is necessary to load 200 images at once. This script loads only the images of the thumbnails on the first page for now.
  - 400 hath - priority: high
2. Too Many Pages is necessary to browse through sad panda without getting the dreaded limit on how many pages you can view.
  - 170 hath - priority: medium
3. Paging Enlargement III is very optional. It allows you get get 200 results in a search.
  - 1600 hath - priority: low
4. Source Nexus and Multi-Page Viewer. Useful perks for future development of this script. No promises.
  - 500 hath - priority: lowest


### To-do

- Make this script work with Multi-Page Viewer. It gets around the limitation of the script, which is that it can load a maximum of 200 pages because of the thumbnails.
- The alternative is to make a recursive function to load page after page, and break out of the recursion when the last page is loaded.

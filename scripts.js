/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"UscqZvWCOI1B6KWe","label":"reddit","bookmarks":[{"id":"bLgiaUnr6YfEf3sx","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"H3UdWT86Ghb2wMdg","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"K3FjqZwEkfXc0Z7g","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"w5X5VE9ezJkCBWmm","label":"sources","bookmarks":[{"id":"OcPRxzLlbZD3XwDE","label":"icons","url":"https://feathericons.com/"},{"id":"RY6Vy3W0sQHc4Bne","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"5y8bJJmcIC1jBfyp","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"A7DGZ9bCzdEfICCn","label":"author","url":"https://prettycoffee.github.io/"}]},{"id":"AMYB3Y4ZklkkYhYM","label":"Github","bookmarks":[{"id":"NdaNE8Kguy4ThPrT","label":"anti-v2","url":"https://github.com/anti-v2"},{"id":"ecEXMI92qXVQ2a7Y","label":"New bookmark","url":""}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()

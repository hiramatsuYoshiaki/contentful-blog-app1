# contentful-blog-app1

> contentful nuxt blog template project
> contentful nuxt

## reate-nuxt-app

```
$ npx create-nuxt-app contentful-blog-app1
? Project name contentful-blog-app1
? Project description contentful nuxt blog template project
? Use a custom server framework none
? Choose features to install Axios
? Use a custom UI framework none
? Use a custom test framework none
? Choose rendering mode Universal
? Author name hiramatsu
? Choose a package manager npm
$ cd contentful-blog-app1
$ npm run dev
```

## Build Setup

```bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

# Contentful から API を取得して Nuxt.js で記事一覧を表示する

https://blog.cloud-acct.com/posts/blog-contentful-api/

contentful 公式
https://www.contentful.com/developers/docs/javascript/tutorials/integrate-contentful-with-vue-and-nuxt/

1. Contentful の SDK をインストールする

```
  $ npm install --save contentful
```

2. 環境変数を扱う dotenv をインストールする

```
  $ npm install --save @nuxtjs/dotenv

```

3. .env ファイルを作成する
   ルートディレクトリ直下、nuxt.config.js と同じ階層に.env ファイルを作成する。
   各 API は、Contentful の Web サイトのヘッダーメニュー「Settings」>>「API keys」より参照する。
   `.env`

```
  CTF_SPACE_ID=スペースIDを記入
  CTF_BLOG_POST_TYPE_ID=blogPost
  CTF_CDA_ACCESS_TOKEN=Delivery APIを記入
  CTF_PREVIEW_ACCESS_TOKEN=Preview APIを記入
```

Git の管理下から除外する
`.gitignore`
...

# dotenv environment variables file

.env
...

4. dotenv のセットアップ
   @nuxtjs/dotenv をモジュールに追加する。
   dotenv モジュールを使って
   .env ファイルを読み込むコード`require('dotenv').config()`を
   export default 前に記入する。
   `nuxt.config.js`

```
  require('dotenv').config() // 追記
  export default {
  modules: [
    '@nuxtjs/dotenv'　// 追記
  ],
}
```

5. .env ファイルの環境変数を Nuxt に登録する
   `nuxt.config.js`

```
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN
  },
```

6. Contentful プラグインファイルを作成する
   plugins ディレクトリ内に contentful.js ファイルを作成
   `plugins/contentful.js`

```
  const contentful = require("contentful");

  const config = {
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_CDA_ACCESS_TOKEN
  };

  const client = contentful.createClient(config);

  export default client;

```

plugins を登録する
`nuxt.config.js`

```
  plugins: [
    'plugins/contentful'
  ],
```

これで Contentful の初期セットアップは完了です。

7. index.vue から Contentful API を取得する
   `index.vue`

```
  <template>
  <div class="container">
    contentful
    <div v-if="posts.length">
      <ul v-for="(post, i) in posts" :key="i">
        <!-- {{JSON.stringify(post)}} -->

        <li>title:{{ post.fields.title }}</li>
        <li>slug:{{ post.fields.slug }}</li>
        <li>heroImage:{{ post.fields.heroImage }}</li>
        <li>body:{{ post.fields.body }}</li>
        <li>author:{{ post.fields.author }}</li>
        <li>publishDate:{{ post.fields.publishDate }}</li>
        <li>tags:{{ post.fields.tags }}</li>
        <li>heroImage/sys/space/sys:{{ post.fields.heroImage.sys.space.sys }}</li>
        <li>heroImage/fields:{{ post.fields.heroImage.fields }}</li>
        <li>heroImage/fields/file/url:{{ post.fields.heroImage.fields.file.url }}</li>

        <li>-------------------------------------------------</li>
        <ul>
          <img
            :src="post.fields.heroImage.fields.file.url"
            :alt="post.fields.heroImage.fields.title"
            :aspect-ratio="16/9"
            max-width="400"
            max-height="225"
          />
        </ul>
      </ul>
      {{JSON.stringify(posts)}}
    </div>
  </div>
</template>

<script>
import client from "~/plugins/contentful";

export default {
  async asyncData({ env }) {
    let posts = [];
    await client
      .getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        order: "-fields.publishDate"
      })
      .then(res => (posts = res.items))
      .catch(console.error);
    return { posts };
  }
};
</script>
```

説明
`store/index.js`
Contentful から API を取得するために用意されたメソッドです。 　
`content_type: env.CTF_BLOG_POST_TYPE_ID`
この環境変数には、.env ファイルで指定した「blogPost」という文字列が入っています。
content_type には、Contentful で作成したモデルの「Api Identifier」を指定します。 　
`order: '-fields.publishDate'`
これは API 取得時の並び順を指定しています。 -をつけると公開日の新しい順に、-を外すと公開日の古い順に並び替えができます。

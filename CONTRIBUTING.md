# CONTRIBUTING

So you want to help out? Great! There's a number of ways you can get involved.

### Building react-light-player locally

#### Forking and cloning the repository

Clone your fork of the repo into your code directory

```sh
git clone https://github.com/<your-username>/react-light-player.git
```

Navigate to the newly cloned directory

```sh
cd react-light-player
```

Assign the original repo to a remote called "upstream"

```sh
git remote add upstream https://github.com/NikFranki/react-light-player.git
```

> In the future, if you want to pull in updates to react-light-player that happened after you cloned the main repo, you can run:
>
> ```sh
> git remote update
> git checkout master
> git pull upstream master
> ```

#### Installing local dependencies

Install the required node.js modules using node package manager

```sh
npm install
```

#### Building react-light-player

To build react-light-player, simply run

```sh
npm run build-prod
```

#### Running a local web server

To run the local webserver:

```sh
npm start
open http://localhost:8886
```

The latter does some extra work which will be described in the next section.

### Making Changes

#### Step 1: Verify

you really find out a bug, or adding a new one.

#### Step 2: Update remote

Before starting work, you want to update your local repository to have all the latest changes.

```sh
git remote update
git checkout master
git rebase upstream/master
```

#### Step 3: Branch

You want to do your work in a separate branch.

```sh
git checkout -b my-branch
```

#### Step 4: Commit

```sh
git add src/js/player.js
git commit
```

> Make sure that git knows your name and email:
>
> ```sh
> git config --global user.name "Random User"
> git config --global user.email "random.user@example.com"
> ```


#### Step 5: Push

```sh
git push origin my-branch
```
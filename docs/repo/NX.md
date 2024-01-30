# NX Commands

## Run a Task

Run the `test` task on the `@waldronmatt/basic-math` package.

```bash
npx nx run @waldronmatt/basic-math:test
```

## Run Multiple Tasks

Run multiple instances of the `test` task. Useful for executing all `test` commands at the workspace root.

```bash
npx nx run-many -t test
```

## Run On Affected Files and Projects

Run the `lint` task for affected files of affected projects and have the linter attempt to automatically fix issues. Useful for executing on staged files before you `git commit`.

```bash
nx affected -t lint --fix --files
```

## Skip Cache

Disables the connection to Nx Cloud for the current run. The remote cache will not be read from or written to.

```bash
npx nx run-many -t test --skip-nx-cache
```

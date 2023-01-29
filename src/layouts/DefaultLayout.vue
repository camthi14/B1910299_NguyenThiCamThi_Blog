<template>
  <div>
    <nav>
      <router-link to="/manager">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>

    <slot />
  </div>
</template>

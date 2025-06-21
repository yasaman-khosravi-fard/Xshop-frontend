<template>
  <div class="min-h-screen flex flex-col">
    <NuxtLoadingIndicator color="blue" />

    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="flex-1">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

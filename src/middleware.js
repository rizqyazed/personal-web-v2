import PocketBase from 'pocketbase';
import { defineMiddleware } from 'astro:middleware';

let previouslySelectedWorks = new Set();

export const onRequest = defineMiddleware(async (context, next) => {
  console.log("middleware");
  const pb = new PocketBase(import.meta.env.POCKETBASE_URL);
  await pb.admins.authWithPassword(import.meta.env.POCKETBASE_EMAIL, import.meta.env.POCKETBASE_PASSWORD);
  const data = await pb.collection('works').getFullList();
  await pb.authStore.clear();
  if (context.url.pathname === "/works") {
    console.log("got into works");
    if (data.length === 0) {
      throw new Error("No works found");
    }

    let randomWork;
    let attempts = 0;
    const maxAttempts = data.length * 2; // To avoid infinite loop

    do {
      const randomIndex = Math.floor(Math.random() * data.length);
      randomWork = data[randomIndex];
      attempts++;
      console.log(attempts);
    } while (
      previouslySelectedWorks.has(randomWork.id) &&
      attempts < maxAttempts
    );

    if (attempts >= maxAttempts) {
      previouslySelectedWorks.clear(); // Reset if all works have been selected
      previouslySelectedWorks.add(randomWork.id);
      console.warn("All works have been selected. Resetting.");
    }

    previouslySelectedWorks.add(randomWork.id);
    console.log(previouslySelectedWorks);
    console.log(randomWork.slug);

    // return context.redirect(`/${randomWork.slug}`, 302);
    return Astro.redirect(new URL(`/${randomWork.slug}`, context.url), 302);
  } 

  return next();
});

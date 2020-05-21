function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  console.log('Taking a break...');
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Two seconds later, showing sleep in a loop...');
}
demo();

async function demo2() {
  // Sleep in loop
  for (let i = 0; i < 5; i++) {
    console.log(i);
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}
demo2();

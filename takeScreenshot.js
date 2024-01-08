export default async(page,log)=>{
    console.log(log?log:"Taking a screenshoty");
    await page.screenshot({path:"page.png",fullPage:true})
}


window.onload = function() {
    let images = [
        "https://www.kark.com/wp-content/uploads/https://ichef.bbci.co.uk/news/976/cpsprodpb/BF0D/production/_106090984_2e39b218-c369-452e-b5be-d2476f9d8728.jpg/85/2020/03/GettyImages-1180515733.jpg?strip=1",
        "https://assets-cms.thescore.com/uploads/image/file/397844/w1280xh720_GettyImages-1180515732.jpg?ts=https://www.diversitypartners.com/wp-content/uploads/2020/12/dc9049-civilwar_master.jpg",
        "https://ownersmag.com/wp-content/uploads/2020/12/Marvel-Cinematic-Universe-characters.jpg",
        "https://hips.hearstapps.com/digitalspyuk.cdnds.net/18/14/1522924460-avengers-infinity-war-poster.jpg?resize=640:",
        "https://deadline.com/wp-content/uploads/2021/11/spidermannowayhomeposter.jpg?w=819",
        "https://assets.gadgets360cdn.com/pricee/assets/product/202111/spider_man_no_way_home_india_1638191040.jpg",
        "https://m.media-amazon.com/images/I/81LRTMDpqeL._AC_UF1000,1000_QL80_.jpg",
        "https://lumiere-a.akamaihd.net/v1/images/pp_thorloveandthunder_herobanner_mobile_639_0c4f6634.jpeg?region=0,0,640,480",
        "https://fathead.com/cdn/shop/products/a6n7xgxnk21qjojsk9qk.jpg?v=1684167599&width=1445",
        "https://upload.wikimedia.org/wikipedia/en/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg"
    ];

    let imagesFromWeb = document.getElementsByTagName("img");





    for (let i = 0; i< imagesFromWeb.length; i++){
        const randomImg = Math.floor(Math.random() * images.length);
        imagesFromWeb[i].src = images[randomImg];
    }

    let textFromWeb = document.getElementsByClassName("text-14");





    for (let i = 0; i< textFromWeb.length; i++){
        textFromWeb[i].innerText = "The name is John";
    }


    


}

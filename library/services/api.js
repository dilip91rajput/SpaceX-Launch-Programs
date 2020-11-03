 async function getData(limit,launch_success,land_success,launch_year){
 let params ={limit:limit,launch_success:launch_success,land_success:land_success,launch_year:launch_year}
 var queryString = '';
  for (const [key, value] of Object.entries(params)) {
    let QVal, flag= false;
    if((value || value ===false) && QVal !== 'null'){
       QVal =  value;
       flag = true;
       this.setValue(key, QVal);
    }else if(!value && this.getValue(key)){
       QVal =  this.getValue(key);
       flag = true;
    }
    
   if(flag) {
        queryString += `${key}=${QVal}&`
      }
  }
  const api_url = 'https://api.spacexdata.com/v3/launches?'+queryString;
  const response = await fetch(api_url);
  const data = await response.json();
  let apiData = [];
  for (const [key, res] of Object.entries(data)) {
     const dt = { flight_number:res.flight_number,
        mission_name: res.mission_name,
        mission_id: res.mission_id, launch_year:res.launch_year,
         launch_success:res.launch_success, land_success:res.rocket.first_stage.cores[0].land_success}
    apiData.push(dt)
  }
  return apiData;
}

function setValue(key, val){
  sessionStorage.setItem(key, val);
}

function getValue(val){
  return sessionStorage.getItem(val);
}


function getCard(data, sn){
    return  `<div class="col-lg-3 col-md-6 mb-4"><div class="card h-100"><a href="#">
      <img class="card-img-top" src="assets/images/product1.png" alt=""></a>
       <div class="card-body"> <h5 class="card-title"> <a href="#">${data.mission_name} #${sn}</a>
         </h5><p class="card-text"><b>Mission Ids:</b> <span>${(data.mission_id).join()}</span></p>
         <p class="card-text"><b>Launch Year:</b> <span>${(data.launch_year)}</span></p>
         <p class="card-text"><b>Successful Launch:</b> <span>${(data.launch_success)}</span></p>
         <p class="card-text"><b>Successful Landing:</b> <span>${(data.land_success)}</span></p> </div></div></div>`
  };

  function getCardList(limit=null,launch_success=null,land_success=null,launch_year=null){
   if(launch_year) {sessionStorage.clear()}
  getData(limit,launch_success,land_success,launch_year).then((res)=>{
    const data = res;
    if(data.length > 0){
     let sn = 0;
     $("#card-list").html('')
    for (const [key, value] of Object.entries(data)) {
      sn++;
      const node = getCard(value, sn);
      $("#card-list").append(node);
    }
  }else{
    $("#card-list").html('<div class="no-records"> No record found</div>')
  }
  })
}



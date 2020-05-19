function PlotMaker(id) {
    //Pull JSON data
        d3.json("samples.json").then (sampledata =>{
            console.log(sampledata)
            var ids = sampledata.samples[0].otu_ids;
            var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            
        // Slice down to top 10 and reverse. This shows the top 10 as the data was already sorted. 
            var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
        // Format OTU ID for plot
            var OTU_id = OTU_top.map(d => "OTU " + d);
            console.log(`OTU IDS: ${OTU_id}`)
         // get the top 10 labels for the plot
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                orientation: "h",
                marker: {
                color: 'light blue'},
                type:"bar",
                
            };
          
            var data = [trace];
            // create layout variable to set plots layout
            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
              
            };
            // create the bar plot
        Plotly.newPlot("bar", data, layout);
         
            var trace1 = {
                x: sampledata.samples[0].otu_ids,
                y: sampledata.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: sampledata.samples[0].sample_values,
                    color: sampledata.samples[0].otu_ids
                },
                text:  sampledata.samples[0].otu_labels
            };
            var bubbleplot = [trace1];
    
        // build the bubble plot
        Plotly.newPlot("bubble", bubbleplot); 
        
        });
    }  
  
    function Demographic(id) {

        d3.json("samples.json").then((data)=> {
            var metadata = data.metadata;
            console.log(metadata)
            var result = metadata.filter(meta => meta.id.toString() === id)[0];
       
           var demographicInfo = d3.select("#sample-metadata");
          
           demographicInfo.html("");
    
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
   
    function optionChanged(id) {
        PlotMaker(id);
        Demographic(id);
    }
    function init() {
       
        var dropdown = d3.select("#selDataset");
        d3.json("samples.json").then((data)=> {
            console.log(data)
                data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            PlotMaker(data.names[0]);
            Demographic(data.names[0]);
        });
    }
    
    init();
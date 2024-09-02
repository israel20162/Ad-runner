


const CampaignCard = (props) => {
console.log(props);
    return (
        <div class="max-w-  bg-white shadow-md rounded-lg overflow-hidden">
           
                                <div>
                                    <img
                                        class="w-full h-48 object-cover"
                                        src={props.imageUrl}
                                        alt={props.name}
                                    />

                               
                                    <div class="p-3">
                                  
                                        <h2 class="text-2xl font-bold mb-2">{props.name}</h2>

                                       
                                        <p class="text-gray-700 mb-4">{props.description}</p>

                                    
                                        <div class="mb-4">
                                            <span class={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${props.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                {props.status}
                                            </span>
                                        </div>

                                     
                                        <div class="text-sm text-gray-500 mb-4">
                                            <p><strong>Start Date:</strong> {new Date(props.startDate).toLocaleDateString()}</p>
                                            <p><strong>End Date:</strong> {new Date(props.endDate).toLocaleDateString()}</p>
                                        </div>

                                      
                                        <div class="text-sm text-gray-500 mb-4">
                                            <p><strong>Platform:</strong> {props.platform.join(', ')}</p>
                                        </div>

                                      
                                        {props.pricesPerMetric && (
                                            <div class="text-sm text-gray-500">
                                                <p><strong>Metric:</strong> {props.pricesPerMetric[0].metric}</p>
                                                <p><strong>Bid:</strong> ${props.pricesPerMetric[0].bid}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                       
           
           


        </div>
    );
};

export default CampaignCard;

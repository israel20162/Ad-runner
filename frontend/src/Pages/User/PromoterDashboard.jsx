import { createSignal, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { useUserContext } from "../../store/userContext";
import { BiSolidDashboard } from 'solid-icons/bi'
import { BsWallet2 } from 'solid-icons/bs'
import { SiSparkpost,SiGoogleadsense } from 'solid-icons/si'
import { FaSolidMoneyBillTrendUp } from 'solid-icons/fa'
import { TbStepInto } from 'solid-icons/tb'
import { HiOutlineCog6Tooth } from 'solid-icons/hi'
import { PromoterSubmissions } from "./promoter/PromoterSubmissions";
function PromoterDashboard() {
  const [state] = useUserContext()
  const [userData, setUserData] = createStore({});
  const [campaigns, setCampaigns] = createSignal([]);
  const [isLoading, setIsLoading] = createSignal(false);
  const [searchQuery, setSearchQuery] = createSignal("");
  const [activeCampaigns, setActiveCampaigns] = createSignal([]);

  // Fetch user data and campaigns on component mount
  createEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Replace with your API call to fetch user data and campaigns
      const response = await fetch(`http://localhost:5000/api/promoter/promoters/${state.user?.id}`);
      const data = await response.json();

      setUserData(data);
      console.log(data);

      setCampaigns(data.campaigns);
      setIsLoading(false);
    };

    fetchData();
  }, []);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };
 
   function NavItem  (props)  {

    return(
      <>
        <div class="flex justify-start gap-2 items-center px-2 py-2 rounded-md  font-medium hover:bg-teal-600 hover:!text-white">
        {props.icon}
          <a href="#" >

            <span class="mr-2">{props.title}</span>

          </a>
        </div>
      </>
    )

  }


  return (
    <div class="grid  h-screen grid-cols-5 py-4 max-w-screen bg-gray-100">
      <aside class="col-span- col-start-1 absolute top-0 left-0">
        <div class=" h-screen w-64 bg-gray- shadow-md">
          <nav class="flex flex-col space-y-4 px-4 py-6">
            <a href="#" class="flex items-center text-lg font-bold text-gray-800 hover:text-gray-700">
              <span class="mr-2">Promoter Dashboard</span>
            </a>
            <ul class="flex flex-col space-y-4 text-black text-lg">
              <li>
               
                <NavItem title='Dashboard' icon={ <BiSolidDashboard size={24} class="text-teal-500 m-0 p-0 hover:text-white" />}/>
              </li>
              <li>
              
                <NavItem title='Campaigns' icon={<SiSparkpost size={24} class="text-teal-500 hover:!text-white  m-0 p-0" />} />
              </li>
              <li>
                <NavItem title='Earnings' icon={<FaSolidMoneyBillTrendUp size={24} class="text-teal-500 hover:!text-white  m-0 p-0" />}/>
              
              </li>
              <li>
                <NavItem title='Submissions' icon={<TbStepInto size={24} class="text-teal-500 hover:!text-white  m-0 p-0" />}/>
              </li>
              <li>
                <NavItem title='Settings' icon={<HiOutlineCog6Tooth size={24} class="text-teal-500 hover:!text-white  m-0 p-0" />}/>
              </li>

            </ul>
          </nav>
        </div>

      </aside>
      <main class="col-span-full w-full col-start-2">
        <div class="flex justify-between items-center w-full mb-4  p-4 ">
          <h2 class="text-2xl font-semibold ">Welcome, <span class="text-teal-500">{userData.username}</span> </h2>
          <div class="bg-gray-100 w-1/3 mr-4 p-4  rounded-lg shadow-md ml-auto">

            <div class="flex items-center">
              <BsWallet2 class="w-7 h-7 mr-2 fill-current text-teal-900" />
              <span class="text-gray-700 font-medium">Account Balance:</span> <span class="text-teal-500 font-bold ml-2">$0.00</span>
            </div>
          </div>
        </div>
        <section class="flex flex-row space-x-4">
          <div class="bg-gry-100 max-w-screen rounded-lg shadow-md mb-4 p-4">
            <h2 class="text-lg font-bold mb-2">Active Campaigns</h2>
            <table class="w-full text-left overflow-hidden">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200">
                  <th class="text-xs font-medium text-gray-500 px-4 py-2 w-48">
                    Campaign Name
                  </th>
                  <th class="text-xs font-medium text-gray-500 px-4 py-2 w-48">
                    Status
                  </th>
                  <th class="text-xs font-medium text-gray-500 px-4 py-2">
                    Earnings (Est.)
                  </th>
                  <th class="text-xs font-medium text-gray-500 px-4 py-2 w-24">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {activeCampaigns.length === 0 ? (
                  <tr class="bg-white border-b">
                    <td colspan="4" class="text-center text-gray-500 p-4">
                      No active campaigns found.
                    </td>
                  </tr>
                ) : (
                  activeCampaigns.map((campaign) => (
                    <tr key={campaign.id} class="bg-white border-b">
                      <td class="text-sm px-4 py-4">{campaign.name}</td>
                      <td class="text-sm px-4 py-4">
                        {/* Display campaign status (e.g., Active, Running) */}
                        {campaign.status}
                      </td>
                      <td class="text-sm px-4 py-4">${campaign.estimatedEarnings}</td>
                      <td class="text-sm px-4 py-4">
                        <button
                          class="text-teal-500 hover:text-teal-700 underline"
                          onClick={() => handleViewDetails(campaign.id)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div class="bg-gry-100 max-w-screen rounded-lg shadow-md mb-4 p-4">
            <h2 class="text-lg font-bold mb-2">Previous Campaigns</h2>
            <table class="w-full text-left overflow-hidden">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200">
                  <th class="text-xs font-medium text-gray-500 px-4 py-2 w-48">
                    Campaign Name
                  </th>
                  <th class="text-xs font-medium text-gray-500 px-4 py-2 w-48">
                    Status
                  </th>
                  <th class="text-xs font-medium text-gray-500 px-4 py-2">
                    Earnings (Est.)
                  </th>
                  <th class="text-xs font-medium text-gray-500 px-4 py-2 w-24">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {activeCampaigns.length === 0 ? (
                  <tr class="bg-white border-b">
                    <td colspan="4" class="text-center text-gray-500 p-4">
                      No active campaigns found.
                    </td>
                  </tr>
                ) : (
                  activeCampaigns.map((campaign) => (
                    <tr key={campaign.id} class="bg-white border-b">
                      <td class="text-sm px-4 py-4">{campaign.name}</td>
                      <td class="text-sm px-4 py-4">
                        {/* Display campaign status (e.g., Active, Running) */}
                        {campaign.status}
                      </td>
                      <td class="text-sm px-4 py-4">${campaign.estimatedEarnings}</td>
                      <td class="text-sm px-4 py-4">
                        <button
                          class="text-teal-500 hover:text-teal-700 underline"
                          onClick={() => handleViewDetails(campaign.id)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
 
      <PromoterSubmissions />
      </main>
     

    </div>
  );
}

export default PromoterDashboard;

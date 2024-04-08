import { createSignal,createEffect } from "solid-js";
export function PromoterSubmissions() {
    const [submissions, setSubmissions] = createSignal([]);
    const [isLoading, setIsLoading] = createSignal(false);

    // Fetch promoter submissions on component mount (replace with your API call)
    createEffect(() => {
        const fetchSubmissions = async () => {
            setIsLoading(true);
            // const response = await fetch("/api/promoter/submissions");
            // const data = await response.json();
            // setSubmissions(data);
            setIsLoading(false);
        };

        fetchSubmissions();
    }, []);

    return (
        <section class="bg-gray-100 rounded-lg shadow-md mb-4 p-4">
            <h2 class="text-lg font-bold mb-2">Your Submissions</h2>
            {isLoading ? (
                <p class="text-gray-500 text-center">Loading submissions...</p>
            ) : submissions().length === 0 ? (
                <p class="text-gray-500 text-center">No submissions found.</p>
            ) : (
                <table class="w-full min-w-full text-left overflow-hidden">
                    <thead>
                        <tr class="bg-gray-50 border-b border-gray-200">
                            <th class="text-xs font-medium text-gray-500 px-4 py-2 w-48">
                                Campaign Name
                            </th>
                            <th class="text-xs font-medium text-gray-500 px-4 py-2 w-48">
                                Submission Date
                            </th>
                            <th class="text-xs font-medium text-gray-500 px-4 py-2 w-24">
                                Status
                            </th>
                            <th class="text-xs font-medium text-gray-500 px-4 py-2 w-24">
                                Payout (Est.)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((submission) => (
                            <tr key={submission.id} class="bg-white border-b">
                                <td class="text-sm px-4 py-4">{submission.campaign.name}</td>
                                <td class="text-sm px-4 py-4">
                                    {new Date(submission.submittedAt).toLocaleDateString()}
                                </td>
                                <td class="text-sm px-4 py-4">
                                    {/* Display submission status (e.g., Pending, Approved, Rejected) */}
                                    {submission.status}
                                </td>
                                <td class="text-sm px-4 py-4">
                                    {submission.status === "Approved" ? (
                                        <span class="text-teal-500 font-medium">
                                            ${submission.estimatedPayout}
                                        </span>
                                    ) : (
                                        "-"
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart2, FileX2, CheckCircle2 } from "lucide-react";

export default function Home() {
  const analytics = {
    pending: 12,
    denied: 5,
    approvedAmount: 24500,
  };

  return (
    <main className="flex flex-1 w-full bg-muted items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col gap-8 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Claims Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border rounded-xl bg-white/80 backdrop-blur-md shadow-lg transition-transform hover:scale-105 hover:shadow-2xl ring-1 ring-blue-100 focus-visible:ring-2 focus-visible:ring-blue-400">
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-blue-100 p-3">
                  <BarChart2 className="h-7 w-7 text-blue-600" />
                </span>
                <div>
                  <CardTitle className="text-lg font-semibold">Pending Reviews</CardTitle>
                  <div className="text-xs text-muted-foreground">Awaiting approval</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <span className="text-5xl font-extrabold text-blue-700 font-mono">{analytics.pending}</span>
            </CardContent>
          </Card>
          <Card className="border rounded-xl bg-white/80 backdrop-blur-md shadow-lg transition-transform hover:scale-105 hover:shadow-2xl ring-1 ring-red-100 focus-visible:ring-2 focus-visible:ring-red-400">
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-red-100 p-3">
                  <FileX2 className="h-7 w-7 text-red-600" />
                </span>
                <div>
                  <CardTitle className="text-lg font-semibold">Denied Claims</CardTitle>
                  <div className="text-xs text-muted-foreground">Rejected this month</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <span className="text-5xl font-extrabold text-red-700 font-mono">{analytics.denied}</span>
            </CardContent>
          </Card>
          <Card className="border rounded-xl bg-white/80 backdrop-blur-md shadow-lg transition-transform hover:scale-105 hover:shadow-2xl ring-1 ring-green-100 focus-visible:ring-2 focus-visible:ring-green-400">
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-green-100 p-3">
                  <CheckCircle2 className="h-7 w-7 text-green-600" />
                </span>
                <div>
                  <CardTitle className="text-lg font-semibold">Amount Approved</CardTitle>
                  <div className="text-xs text-muted-foreground">Total payout</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <span className="text-4xl md:text-5xl font-extrabold text-green-700 font-mono">
                ${analytics.approvedAmount.toLocaleString()}
              </span>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
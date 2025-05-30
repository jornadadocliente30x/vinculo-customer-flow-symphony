import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const funnelData = [
	{
		stage: 'Leads',
		count: 2847,
		percentage: 100,
		gradient: 'from-blue-600 to-purple-600',
	},
	{
		stage: 'Agendamentos',
		count: 1423,
		percentage: 50,
		gradient: 'from-emerald-500 to-teal-500',
	},
	{
		stage: 'Jornada',
		count: 712,
		percentage: 25,
		gradient: 'from-amber-500 to-orange-500',
	},
];

export function SalesFunnel() {
	return (
		<Card className="rounded-xl border border-gray-100 bg-white shadow-soft">
			<CardHeader>
				<CardTitle className="text-xl font-semibold text-gray-900">
					Funil de Vendas
				</CardTitle>
			</CardHeader>
			<CardContent className="p-6">
				<div className="space-y-6">
					{funnelData.map((stage, index) => {
						const conversionRate =
							index < funnelData.length - 1
								? Math.round(
										(funnelData[index + 1].count / stage.count) * 100
								  )
								: null;

						return (
							<div key={stage.stage} className="relative">
								{/* Main funnel bar */}
								<div className="relative mb-3">
									<div
										className={cn(
											'relative overflow-hidden rounded-xl p-5 text-white shadow-medium transition-all duration-300 hover:shadow-strong',
											`bg-gradient-to-r ${stage.gradient}`
										)}
										style={{
											width: `${Math.max(stage.percentage, 30)}%`,
											minWidth: '280px',
										}}
									>
										{/* Background pattern */}
										<div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />

										<div className="relative flex justify-between">
											<div>
												<h4 className="text-lg font-semibold">{stage.stage}</h4>
												<p className="opacity-90 text-sm">
													{stage.percentage}% dos leads iniciais
												</p>
											</div>
											<div className="text-right">
												<div className="font-bold text-2xl">
													{stage.count.toLocaleString()}
												</div>
												<div className="opacity-90 text-sm">
													contatos
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* Conversion rate badge - positioned outside the bar */}
								{conversionRate && (
									<div className="mb-2 flex justify-center">
										<div className="rounded-full border border-gray-200 bg-white px-4 py-2 shadow-soft">
											<div className="flex items-center space-x-2">
												<div className="h-2 w-2 rounded-full bg-gradient-to-r from-gray-400 to-gray-600" />
												<span className="text-sm font-medium text-gray-700">
													{conversionRate}% conversão
												</span>
											</div>
										</div>
									</div>
								)}

								{/* Connection line to next stage */}
								{index < funnelData.length - 1 && (
									<div className="flex justify-center">
										<div className="h-4 w-px bg-gradient-to-b from-gray-300 to-gray-400" />
									</div>
								)}
							</div>
						);
					})}
				</div>

				{/* Summary stats */}
				<div className="mt-8 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 p-4">
					<div className="grid grid-cols-2 gap-4 text-center">
						<div>
							<div className="text-2xl font-bold text-gray-900">
								{Math.round(
									(funnelData[funnelData.length - 1].count /
										funnelData[0].count) *
										100
								)}
								%
							</div>
							<div className="text-sm text-gray-600">
								Taxa de Conversão Total
							</div>
						</div>
						<div>
							<div className="text-2xl font-bold text-gray-900">
								{funnelData[0].count - funnelData[funnelData.length - 1].count}
							</div>
							<div className="text-sm text-gray-600">Leads Perdidos</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

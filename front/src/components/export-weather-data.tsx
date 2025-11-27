import { toast } from "sonner";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { exportWeatherFile } from "@/services/export-weather-file";
import { useMutation } from "@tanstack/react-query";

export function ExportWeatherData() {
      const { isPending: isDownloading, mutate } = useMutation({
        mutationKey: ['export-weather-file'],
        mutationFn: (format: string) => exportWeatherFile(format as 'csv' | 'xlsx'),
        onError: () => {
        toast.error('Erro ao baixar o arquivo de clima.')
        },
        onSuccess: (data) => {
        const url = window.URL.createObjectURL(new Blob([data.blob]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', data.filename)
        document.body.appendChild(link)
        link.click()
        link.remove()
        toast.success('Arquivo de clima baixado com sucesso.')
        }
    })

    return (
        <div className="flex gap-2">
            <Button disabled={isDownloading} onClick={() => mutate('csv')} variant="secondary">
                {isDownloading && <Spinner />}
                Baixar CSV
            </Button>
            <Button disabled={isDownloading} onClick={() => mutate('xlsx')} variant="secondary">
                {isDownloading && <Spinner />}
                Baixar XLSX
            </Button>
        </div>
    )
}
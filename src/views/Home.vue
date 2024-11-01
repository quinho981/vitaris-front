<template>
    <Fluid class="flex justify-center items-center min-h-screen">
        <div class="flex w-3/5">
            <div class="p-3 flex flex-col gap-4 w-full">
                <div class="font-semibold text-xl">Nova consulta</div>
                
                <div class="flex flex-wrap">
                    <label for="address">Contexto da consulta</label>
                    <Textarea id="address" class="w-full !max-h-10 !overflow-auto resize-none border !rounded-md p-2" />
                    <span class="pt-1">
                        <i class="pi pi-paperclip"></i> Enviar arquivo de áudio
                    </span>
                </div>

                <div class="flex-column">
                    <div class="flex items-center justify-between pr-1 py-1">
                        <div class="">
                            Testar microfone
                        </div>
                        <div class="">
                            teste
                        </div>
                    </div>
                    <div class="pt-2">
                        <Button icon="pi pi-microphone" label="Gravar consulta" rounded />
                    </div>
                </div>
            </div>
        </div>
    </Fluid>
</template>

<script setup>
</script>

<style>
</style>
import { NgModule } from '@angular/core';
//*no es necesario CommonModule, tambien se quitan las declaraciones
//import { CommonModule } from '@angular/common';
//funcionalidad de enrutamiento
import { RouterModule, Routes } from '@angular/router';
//dashboard
import { DashboardComponent } from './dashboard/dashboard.component';
//lista de heroes
import { HeroesComponent } from './heroes/heroes.component';
//detalle de heroe
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

/**
 * *A continuacion se configuran las rutas.
 * constante de tipo Routes, es un array de objetos Route con propiedades path y component.
 * *las rutas indican al enrutador que vista mostrar, tienen dos partes: 
 * - path: cadena que coincide con una URL en la barra de direcciones del navegador.
 * - component: el componente que el enrutador debe crear al navegar en esa ruta.
 */
const routes: Routes = [
  //ruta por defecto
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //rutas a dashboard
  { path: 'dashboard', component: DashboardComponent },
  //ruta a la lista de heroes
  { path: 'heroes', component: HeroesComponent },
  //ruta a el detalle de un heroe (parametro id)
  { path: 'detail/:id', component: HeroDetailComponent }
];

/**
 * *En Angular, la mejor práctica es cargar y configurar el enrutador en un módulo de 
 * *nivel superior separado que está dedicado al enrutamiento e importado por la raíz AppModule.
 * Por convención, el nombre de la clase del módulo es AppRoutingModule y 
 * pertenece a app-routing.module.ts en la carpeta src/app.
 * ?como se genera este archivo:
 * * ng generate module app-routing --flat --module=app
 * * --flat indica que el archivo debe estar es src/app y no en su propia carpeta
 * * --module=app indica que se importe este modulo de rutas en AppComponent
 */

/**
 * *Los metadatos de NgModule inicializan el enrutador y lo hacen escuchar los cambios
 * de ubicacion del navegador.
 * importa: RouterModule y lo configura para el arreglo de rutas anterior.
 * luego exporta RouterModule configurado.
 * 
 * *NOTA: El metodo se llama forRoot() porque configura el enrutador en el nivel raiz 
 * *de la aplicacion. El metodo forRoot() proporciona los proveedores de servicios y las 
 * *directivas necesarias para el enrutamiento, y realiza la navegacion inicial basada en 
 * *la URL del navegador actual.
 */
@NgModule({
  //declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

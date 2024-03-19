import { BookService } from "src/app/services/book.service";
import { HomeComponent } from "./home.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Book } from "src/app/models/book.model";
import { of } from "rxjs";
import { Pipe, PipeTransform } from "@angular/core";


const listBook: Book[] = [
    {
        name: '',
        author: '',
        isbn: '',
        price: 15,
        amount: 2
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 20,
        amount: 1
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 8,
        amount: 7
    }
]; 

const bookServiceMock = {
    getBooks: () => of(listBook),
};

@Pipe({name: 'reduceText'})
class ReduceTextPipeMock implements PipeTransform {
    transform():string {
        return '';
    }
}

describe('Home component',()=> {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                HomeComponent,
                ReduceTextPipeMock
            ],
            providers: [
                // 
                {
                    provide: BookService,
                    useValue: bookServiceMock
                }
            ]
        }).compileComponents();

    });

    beforeEach(()=>{
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', ()=>{
        expect(component).toBeTruthy();
    })

    it('getBook get books from the subscription', ()=>{
        const bookService = fixture.debugElement.injector.get(BookService);
        // const listBook: Book[] = [];
        // const spy1 = spyOn(bookService,'getBooks').and.returnValue(of(listBook));
        component.getBooks();
        // expect(spy1).toHaveBeenCalled();
        expect(component.listBook.length).toBe(3);

    })


});
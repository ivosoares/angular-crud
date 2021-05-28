import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockResponse = [{
    id: 1,
    nome: "Ivonaldo",
    sobrenome: "Soares",
    idade: 26,
    profissao: "Professor"
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(UsersService);
  });

  it('should be return response users', ()=> {
    service.getUsers().subscribe(response => {
      expect(response).toEqual(mockResponse);
    })
  })

  it('should be return user reponse', ()=> {
    service.getUser('Ivonaldo').subscribe(response => {
      expect(response).toEqual(mockResponse);
    })
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

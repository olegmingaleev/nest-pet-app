import { Injectable } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export class Password {
  private static readonly salt = 10;

  static hash(pass: string): string {
    return hashSync(pass, Password.salt);
  }

  static compare(pass: string, userPass: string): boolean {
    return compareSync(pass, userPass);
  }
}

import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StockEntity {
  @PrimaryColumn({ unique: true })
  public id: string;

  @Column({ unique: true })
  public name: string;

  @Column({ unique: false })
  public description: string;

  @Column({ unique: false })
  public currentPrice: number;

  @Column({ unique: false })
  public startPrice: number;

  @Column({ unique: false })
  public startDate: string;
}

export default StockEntity;

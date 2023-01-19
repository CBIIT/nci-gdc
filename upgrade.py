import mysql.connector, os, uuid
env=os.environ
class upgrade:
    def __init__(self):
        tables=[
            'taxonomy_term_revision__parent',
            'taxonomy_term_revision',
            'taxonomy_term__parent',
            'taxonomy_term_field_revision',
            'taxonomy_term_field_data',
            'taxonomy_index',
            'taxonomy_term_data'
            ]               
        self.oconnection = mysql.connector.connect(user=env['olddbun'], password=env['olddbpwd'],host=env['olddbhost'],database=env['olddbdb'])
        self.nconnection = mysql.connector.connect(user=env['newdbun'], password=env['newdbpwd'],host=env['newdbhost'],database=env['newdbdb'])   
        self.results=[]
        self.uuid=uuid
        ## delete all path aliases ##
        ncursor = self.nconnection.cursor()
        query="delete from path_alias where path like '/taxonomy/term/%';"
        ncursor.execute(query)
        self.nconnection.commit()
        ncursor.close()

        ## remove all taxonomy records ##
        for (x) in tables:
            ncursor = self.nconnection.cursor()
            query="delete from %s.%s" % (env['newdbdb'],x)
            ncursor.execute(query)
            self.nconnection.commit()
            ncursor.close()
        
        ncursor=self.oconnection.cursor()
        query = ("SELECT a.*,b.parent,c.alias,d.machine_name as vocab FROM %s.taxonomy_term_data a, %s.taxonomy_term_hierarchy b, %s.url_alias c, %s.taxonomy_vocabulary d  where a.tid=b.tid and CONCAT('taxonomy/term/',a.tid)=c.source and a.vid=d.vid order by a.tid;" % (env['olddbdb'],env['olddbdb'],env['olddbdb'],env['olddbdb']))
        ncursor.execute(query)
        for (x) in ncursor:
            print (x)
            self.results.append(x)
        ncursor.close()

    def upgradeTermData(self):
        for (x) in self.results:
            ncursor=self.nconnection.cursor()
            tid,vid,name,description,format,weight,uuid,parent,alias,vocab,path_uuid=x[0],x[1],x[2],x[3],x[4],x[5],x[6],x[7],x[8],x[9],str(self.uuid.uuid4())
            query = "INSERT INTO %s.taxonomy_term_data (`tid`, `revision_id`, `vid`, `uuid`, `langcode`) VALUES (%s, %s, '%s', '%s', 'en');" % (env['newdbdb'],tid,tid,vocab,uuid)
            ncursor.execute(query)
            self.nconnection.commit()
            ncursor.close()
            ncursor=self.nconnection.cursor()            
            path_query = "INSERT INTO %s.path_alias (`id`, `revision_id`, `uuid`, `langcode`, `path`,`alias`,`status`) VALUES (%s, %s, '%s', 'en','/taxonomy/term/%s', '%s','1');" % (env['newdbdb'],tid,tid,path_uuid,tid,alias)
            ncursor.execute(path_query)
            self.nconnection.commit()
            ncursor.close()
        print ('Done Term Data')
    def upgradeTermFieldData(self):
        for (x) in self.results:
            tid,vid,name,description,description_format,weight,uuid,parent,alias,vocab=x[0],x[1],x[2],x[3],x[4],x[5],x[6],x[7],x[8],x[9]
            if description==None:
                description=''
                description_format='basic_html'
            else:
                description=str.replace(description,"'","\\'")
                description_format='basic_html'

            query_taxonomy_term_field_data = "INSERT INTO %s.taxonomy_term_field_data (`tid`, `revision_id`, `vid`, `langcode`, `status`, `name`, `description__value`,`description__format`, `weight`, `changed`, `default_langcode`, `revision_translation_affected`) VALUES ('%s', '%s', '%s', 'en', '1', '%s', '%s','%s', '%s', '1673542874', '1','1');" % (env['newdbdb'],tid,tid,vocab,name,description,description_format,weight)
            query_taxonomy_term_field_revision = "INSERT INTO %s.taxonomy_term_field_revision (`tid`, `revision_id`, `langcode`, `status`, `name`, `description__value`,`description__format`, `changed`, `default_langcode`, `revision_translation_affected`) VALUES ('%s', '%s', 'en', '1', '%s', '%s','%s', '1673542874', '1','1');" % (env['newdbdb'],tid,tid,name,description,description_format)
            query_taxonomy_term__parent = "INSERT INTO %s.taxonomy_term__parent (`bundle`, `deleted`, `entity_id`, `revision_id`, `langcode`, `delta`,`parent_target_id`) VALUES ('%s', '0', '%s', '%s', 'en', '0','%s');" % (env['newdbdb'],vocab,tid,tid,parent)
            query_taxonomy_term_revision = "INSERT INTO %s.taxonomy_term_revision (`tid`, `revision_id`, `langcode`, `revision_created`, `revision_default`) VALUES ('%s', '%s', 'en', '1673542874', '1');" % (env['newdbdb'],tid,tid)
            query_taxonomy_term_revision__parent = "INSERT INTO %s.`taxonomy_term_revision__parent` (`bundle`, `deleted`, `entity_id`, `revision_id`, `langcode`, `delta`,`parent_target_id`) VALUES ('%s', '0', '%s', '%s', 'en', '0','%s');" % (env['newdbdb'],vocab,tid,tid,parent)

            ncursor=self.nconnection.cursor()
            ncursor.execute(query_taxonomy_term_field_data)
            self.nconnection.commit()
            ncursor.close()

            ncursor=self.nconnection.cursor()
            ncursor.execute(query_taxonomy_term_field_revision)
            self.nconnection.commit()
            ncursor.close()   

            ncursor=self.nconnection.cursor()
            ncursor.execute(query_taxonomy_term__parent)
            self.nconnection.commit()
            ncursor.close()     

            ncursor=self.nconnection.cursor()
            ncursor.execute(query_taxonomy_term_revision)
            self.nconnection.commit()
            ncursor.close()    

            ncursor=self.nconnection.cursor()
            ncursor.execute(query_taxonomy_term_revision__parent)
            self.nconnection.commit()
            ncursor.close()                                        

        print ('Done Term Field Data')

if __name__ == "__main__":
    upgrade = upgrade()
    upgrade.upgradeTermData()
    upgrade.upgradeTermFieldData()
    # upgrade.closeCursor()

